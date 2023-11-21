import { useEffect, useState, useRef } from "react";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";


// Service
import { NodeService } from '../../service/NodeService';

// Styles
import styles from "./TreeTableGrid.module.scss";

const TreeTableGrid = () => {
    const [nodes, setNodes] = useState([]);
    const [selectedNodeKey, setSelectedNodeKey] = useState(null);
    const [metaKey, setMetaKey] = useState(true);

    const descRef = useRef();

    useEffect(() => {
        NodeService.getTreeTableNodes().then((data) => setNodes(data));
    }, []);

    const onEditorValueChange = (options, value) => {
        let newNodes = JSON.parse(JSON.stringify(nodes));
        let editedNode = findNodeByKey(newNodes, options.node.key);

        editedNode.data[options.field] = value;

        setNodes(newNodes);
    };

    const findNodeByKey = (nodes, key) => {
        let path = key.split('-');
        let node;

        while (path.length) {
            let list = node ? node.children : nodes;

            node = list[parseInt(path[0], 10)];
            path.shift();
        }

        return node;
    };

    const onEscape = (e) => {
        if (e.key === "Escape") {
            descRef.current.blur();
        };
    };

    const inputTextEditor = (options) => {
        if (!(options.node.children && options.node.children.length > 0)) {
            return <InputText type="text" ref={descRef} onKeyDown={onEscape} value={options.rowData[options.field]} onChange={(e) => onEditorValueChange(options, e.target.value)} />
        } else {
            return options.rowData[options.field]
        }

    };

    const valEditor = (options) => {
        return inputTextEditor(options);
    };

    const coloredBody = (options) => {
        return <span className={styles.red}>{options.data.securityName}</span>
    }

    const calculateTotal = (rowData) => {
        if (rowData.children) {
          let total = rowData.children.reduce((acc, child) => acc + Number(child.data.val), 0);
          for(let i = 0; i <= rowData.children.length; i++) {
              if(rowData.children[i]) {
                total = rowData.children.reduce((acc, child) => acc + Number(child.data.val), 0);
            }
          }
          return <span>{total}</span>;
        }

    return <span>{rowData.data.val}</span>;
  };

    const columns = [
        { field: 'name', header: 'Name', expander: true },
        { field: 'securityName', header: 'Security Name', body: coloredBody },
        { field: 'val', header: 'Val', editor: valEditor, body: calculateTotal }
    ];

    

    return (
        <div className="card">
            <TreeTable value={nodes} showGridlines selectionMode="single" selectionKeys={selectedNodeKey} onSelectionChange={(e) => setSelectedNodeKey(e.value)} metaKeySelection={metaKey} tableStyle={{ minWidth: '50rem' }}>
                {columns.map((col, i) => (
                    <Column key={col.field} field={col.field} header={col.header} expander={col.expander} editor={col.editor} body={col.body} />
                ))}
            </TreeTable>
        </div>
    );
};

export default TreeTableGrid;
