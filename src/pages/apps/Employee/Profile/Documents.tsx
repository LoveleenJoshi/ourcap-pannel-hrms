// import React, { useState } from 'react';
// import { Card, Button, Row } from 'react-bootstrap';
// import config from "../../../../config";
// import BASE_URL from '../../../../Base_URL/base_url';
// import Table from '../../../../components/Table';

// const ActionColumn = ({ row, onDelete }: { row: any, onDelete: (id: number) => void }) => {
//     const handleDownload = async () => {
//         try {
//             // Log the download attempt
//             console.log('Downloading file from:', row.original.document_file);
    
//             // Fetch the file as a Blob
//             const response = await fetch(row.original.document_file, {
//                 method: 'GET', // Assuming GET, update if necessary
//                 headers: {
//                     'Authorization': `Bearer ${config.API_TOKEN}`, // If needed
//                     'Content-Type': 'application/octet-stream',
//                     'Accept': 'application/json'
//                 }
//             });
    
//             if (!response.ok) {
//                 throw new Error(`Failed to fetch the file: ${response.statusText}`);
//             }
    
//             const blob = await response.blob();
//             const url = window.URL.createObjectURL(blob);
    
//             const a = document.createElement('a');
//             a.style.display = 'none';
//             a.href = url;
//             const filename = row.original.document_file.split('/').pop() || 'download.pdf';
//             a.download = filename; 
//             document.body.appendChild(a);
//             a.click();
    
//             window.URL.revokeObjectURL(url);
//             document.body.removeChild(a);
    
//             alert("Your file has been downloaded!");
//         } catch (error) {
//             console.error('Download error:', error);
//             alert("Failed to download the file.");
//         }
//     };

//     const handleDelete = async () => {
//         try {
//             const formData = new FormData();
//             formData.append('ducumentsID', row.original.id.toString());

//             const response = await fetch(`${BASE_URL}/api/delete-ducument`, {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${config.API_TOKEN}`,
//                     'Accept': 'application/json'
//                 },
//                 body: formData,
//             });

//             if (response.ok) {
//                 alert('Document deleted successfully');
//                 onDelete(row.original.id);
//             } else {
//                 throw new Error('Failed to delete document');
//             }
//         } catch (error) {
//             console.error('Delete error:', error);
//             alert('Failed to delete the document.');
//         }
//     };

//     return (
//         <>
//             <Button variant="light" onClick={handleDownload}>
//                 <i className="mdi mdi-download"></i>
//             </Button> {' '}
//             <Button variant="danger" onClick={handleDelete}>
//                 <i className="mdi mdi-close"></i>
//             </Button>
//         </>
//     );
// };

// interface Docs {
//     id: number;
//     sn: number;
//     title: string;
//     document_file: string;
// }

// interface DocsProp {
//     DocsData: Docs[];
//     setDocsDataMain: React.Dispatch<React.SetStateAction<Docs[]>>;
// }

// // feeds
// const Documents: React.FC<DocsProp> = ({ DocsData, setDocsDataMain }) => {
//     const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files) {
//             setSelectedFiles(event.target.files);
//         }
//     };

//     const handleUpload = async () => {
//         if (selectedFiles && selectedFiles.length > 0) {
//             const formData = new FormData();
//             Array.from(selectedFiles).forEach(file => {
//                 formData.append('document_file', file);
//             });

//             formData.append('title', 'Your Default Title Here');

//             const headers = {
//                 "Accept": "application/json",
//                 "Authorization": `Bearer ${config.API_TOKEN}`
//             };

//             try {
//                 const response = await fetch(`${BASE_URL}/api/upload-document`, {
//                     method: 'POST',
//                     headers: headers,
//                     body: formData,
//                 });

//                 if (response.ok) {
//                     const result = await response.json();
//                     alert('Upload successful!');
//                     setDocsDataMain(prevDocs => [...prevDocs, {
//                         id: result.id,
//                         sn: prevDocs.length + 1,
//                         title: result.title || 'New Document',
//                         document_file: result.document_file
//                     }]);
//                 } else {
//                     const errorResult = await response.json();
//                     throw new Error(`Upload failed: ${errorResult.message || JSON.stringify(errorResult)}`);
//                 }
//             } catch (error) {
//                 console.error('Error uploading file:', error);
//             }
//         } else {
//             alert('No file selected.');
//         }
//     };

//     const onDelete = (id: number) => {
//         setDocsDataMain(prevDocs => prevDocs.filter(doc => doc.id !== id));
//     };

//     const columns = [
//         {
//             Header: 'SN',
//             accessor: 'sn',
//             sort: false,
//         },
//         {
//             Header: 'File Name',
//             accessor: 'title',
//             sort: false,
//         },
//         {
//             Header: 'Action',
//             accessor: 'document_file',
//             sort: false,
//             Cell: ({ row }: { row: any }) => <ActionColumn row={row} onDelete={onDelete} />,
//         },
//     ];

//     const modifiedDocsData = DocsData.map((doc, index) => ({
//         ...doc,
//         sn: index + 1,
//     }));

//     const sizePerPageList = [
//         { text: '5', value: 5 },
//         { text: '10', value: 10 },
//         { text: '25', value: 25 },
//         { text: 'All', value: 0 },
//     ];

//     return (
//         <>
//             <Card>
//                 <Card.Body>
//                     <input type="file" multiple onChange={handleFileChange} />
//                     <Button
//                         variant='outline-primary'
//                         onClick={handleUpload}
//                         className="btn-sm waves-effect waves-light float-end"
//                     >
//                         <i className="mdi mdi-upload"></i> Upload
//                     </Button>
//                     <h4 className="header-title mb-3 mt-2">Documents</h4>
//                     <Row>
//                         <Table
//                             columns={columns}
//                             data={modifiedDocsData}
//                             pageSize={10}
//                             sizePerPageList={sizePerPageList}
//                             isSortable={false}
//                             pagination={false}
//                             isSearchable={false}
//                             tableClass="table-striped dt-responsive nowrap w-100"
//                         />
//                     </Row>
//                 </Card.Body>
//             </Card>
//         </>
//     );
// };

// export default Documents;



import React, { useState } from 'react';
import { Card, Button, Row, Modal, Form } from 'react-bootstrap';
import config from "../../../../config";
import BASE_URL from '../../../../Base_URL/base_url';
import Table from '../../../../components/Table';

const ActionColumn = ({ row, onDelete }: { row: any, onDelete: (id: number) => void }) => {
    const handleDownload = async () => {
        try {
            console.log('Downloading file from:', row.original.document_file);

            const response = await fetch(row.original.document_file, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${config.API_TOKEN}`,
                    'Content-Type': 'application/octet-stream',
                    'Accept': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch the file: ${response.statusText}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            const filename = row.original.document_file.split('/').pop() || 'download.pdf';
            a.download = filename; 
            document.body.appendChild(a);
            a.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            alert("Your file has been downloaded!");
        } catch (error) {
            console.error('Download error:', error);
            alert("Failed to download the file.");
        }
    };

    const handleDelete = async () => {
        try {
            const formData = new FormData();
            formData.append('ducumentsID', row.original.id.toString());

            const response = await fetch(`${BASE_URL}/api/delete-ducument`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${config.API_TOKEN}`,
                    'Accept': 'application/json'
                },
                body: formData,
            });

            if (response.ok) {
                alert('Document deleted successfully');
                onDelete(row.original.id);
            } else {
                throw new Error('Failed to delete document');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete the document.');
        }
    };

    return (
        <>
            <Button variant="light" onClick={handleDownload}>
                <i className="mdi mdi-download"></i>
            </Button> {' '}
            <Button variant="danger" onClick={handleDelete}>
                <i className="mdi mdi-close"></i>
            </Button>
        </>
    );
};

interface Docs {
    id: number;
    sn: number;
    title: string;
    document_file: string;
}

interface DocsProp {
    DocsData: Docs[];
    setDocsDataMain: React.Dispatch<React.SetStateAction<Docs[]>>;
}

const Documents: React.FC<DocsProp> = ({ DocsData, setDocsDataMain }) => {
    const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("");
    const [tableKey, setTableKey] = useState(0);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFiles(event.target.files);
        }
    };

    const handleUpload = async () => {
        if (selectedFiles && selectedFiles.length > 0 && title.trim() !== "") {
            const formData = new FormData();
            Array.from(selectedFiles).forEach(file => {
                formData.append('document_file', file);
            });

            formData.append('title', title);

            const headers = {
                "Accept": "application/json",
                "Authorization": `Bearer ${config.API_TOKEN}`
            };

            try {
                const response = await fetch(`${BASE_URL}/api/upload-document`, {
                    method: 'POST',
                    headers: headers,
                    body: formData,
                });

                if (response.ok) {
                    const result = await response.json();
                    alert('Upload successful!');
                    setDocsDataMain(prevDocs => [...prevDocs, {
                        id: result.id,
                        sn: prevDocs.length + 1,
                        title: title,  // Use the title from the state
                        document_file: result.document_file
                    }]);
                    setShowModal(false);
                    setTitle("");
                    setSelectedFiles(null);
                    setTableKey(prevKey => prevKey + 1);  // Force re-render by updating key
                } else {
                    const errorResult = await response.json();
                    throw new Error(`Upload failed: ${errorResult.message || JSON.stringify(errorResult)}`);
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            alert('Please fill in all fields.');
        }
    };

    const onDelete = (id: number) => {
        setDocsDataMain(prevDocs => prevDocs.filter(doc => doc.id !== id));
    };

    const columns = [
        {
            Header: 'SN',
            accessor: 'sn',
            sort: false,
        },
        {
            Header: 'File Name',
            accessor: 'title',
            sort: false,
        },
        {
            Header: 'Action',
            accessor: 'document_file',
            sort: false,
            Cell: ({ row }: { row: any }) => <ActionColumn row={row} onDelete={onDelete} />,
        },
    ];

    const modifiedDocsData = DocsData.map((doc, index) => ({
        ...doc,
        sn: index + 1,
    }));

    const sizePerPageList = [
        { text: '5', value: 5 },
        { text: '10', value: 10 },
        { text: '25', value: 25 },
        { text: 'All', value: 0 },
    ];

    return (
        <>
            <Card>
                <Card.Body>
                    <Button
                        variant='outline-primary'
                        onClick={() => setShowModal(true)}
                        className="btn-sm waves-effect waves-light float-end"
                    >
                        <i className="mdi mdi-plus"></i> Add
                    </Button>
                    <h4 className="header-title mb-3 mt-2">Documents</h4>
                    <Row>
                        <Table
                            key={tableKey}  // Add key to force re-render
                            columns={columns}
                            data={modifiedDocsData}
                            pageSize={10}
                            sizePerPageList={sizePerPageList}
                            isSortable={false}
                            pagination={false}
                            isSearchable={false}
                            tableClass="table-striped dt-responsive nowrap w-100"
                        />
                    </Row>
                </Card.Body>
            </Card>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Document</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter title"
                            />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Label>File</Form.Label>
                            <Form.Control type="file" multiple onChange={handleFileChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="light" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleUpload}>
                        Upload
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Documents;
