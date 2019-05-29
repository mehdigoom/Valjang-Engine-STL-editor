class ValjangEngineSubMesh
{
    private _ValjangEnginesMesh: ValjangEngine.Mesh;
    private _subMesh: Module.SubMesh;
    private _ID: number;
    private _versionNumber: number;

    public constructor(scene: ValjangEngine.Scene, parentNode: ValjangEngine.Node, subMesh: Module.SubMesh, material: ValjangEngine.StandardMaterial)
    {
        this._subMesh = subMesh;
        this._ID = subMesh.GetID();
        this._versionNumber = subMesh.GetVersionNumber();

        this._ValjangEnginesMesh = new ValjangEngine.Mesh("subMesh-" + this._ID, scene, parentNode);
        this._ValjangEnginesMesh.freezeWorldMatrix();
        if(material != null)
        {
            this._ValjangEnginesMesh.material = material;
            this._ValjangEnginesMesh.material.freeze();
        }        

        let meshData: ValjangEngine.VertexData = new ValjangEngine.VertexData();
        let buf: Int8Array = this._subMesh.Triangles();
        let triangles: Uint32Array = new Uint32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
        buf = this._subMesh.Vertices();
        let vertices: Float32Array = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
        buf = this._subMesh.Normals();
        let normals: Float32Array = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
        meshData.indices = triangles;
        meshData.positions = vertices;
        meshData.normals = normals;
        this._ValjangEnginesMesh.sideOrientation = ValjangEngine.Mesh.FRONTSIDE;
        this._ValjangEnginesMesh.isPickable = false;
        meshData.applyToMesh(this._ValjangEnginesMesh, true);
    }

    public Cleanup()
    {
        //this._subMesh.delete();
        this._subMesh = null;
        this._ValjangEnginesMesh.dispose();
        this._ValjangEnginesMesh = null;
    }

    public Update()
    {
        let curVersionNumber: number = this._subMesh.GetVersionNumber();
        if(this._versionNumber != curVersionNumber)  // Only update data if sub mesh has been updated
        {
            this._versionNumber = curVersionNumber;
            this.UpdataMeshData();
        }
    }

    public UpdataMeshData()
    {
        let buf: Int8Array = this._subMesh.Triangles();
        let triangles: Uint32Array = new Uint32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
        buf = this._subMesh.Vertices();
        let vertices: Float32Array = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);
        buf = this._subMesh.Normals();
        let normals: Float32Array = new Float32Array(buf.buffer, buf.byteOffset, buf.byteLength / 4);

        // Vertices and normals
        if(this._ValjangEnginesMesh._geometry.getTotalVertices() < vertices.length / 3)
        {
            this._ValjangEnginesMesh.setVerticesData(ValjangEngine.VertexBuffer.PositionKind, vertices, true);
            this._ValjangEnginesMesh.setVerticesData(ValjangEngine.VertexBuffer.NormalKind, normals, true);
        }
        else
        {
            this._ValjangEnginesMesh.updateVerticesData(ValjangEngine.VertexBuffer.PositionKind, vertices, false, false);
            this._ValjangEnginesMesh.updateVerticesData(ValjangEngine.VertexBuffer.NormalKind, normals, false, false);
        }

        // Triangle indices
        this._ValjangEnginesMesh.setIndices(triangles);
    }

    public GetID(): number
    {
        return this._ID;
    }
}
