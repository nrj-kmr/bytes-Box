const FileTreeNode = ({ fileName, nodes, onSelect, path }) => {
    const isDir = !!nodes
    return (
        <div className="ml-5" onClick={(e) => {
            e.stopPropagation()
            if (isDir) return;
            onSelect(path)
        }}>
            <p className={isDir ? "" : "bg-gray-400 cursor-pointer"} >{fileName}</p>
            {nodes && (<ul>
                {Object.keys(nodes).map(child =>
                    <li key={child}>
                        <FileTreeNode
                            onSelect={onSelect}
                            fileName={child}
                            nodes={nodes[child]}
                            path={path + "/" + child}
                        />
                    </li>
                )}
            </ul>
            )}
        </div>
    )
}

const FileTree = ({ tree, onSelect }) => {
    return (
        <FileTreeNode
            onSelect={onSelect}
            fileName="/"
            nodes={tree}
            path=""
        />
    )
}

export default FileTree