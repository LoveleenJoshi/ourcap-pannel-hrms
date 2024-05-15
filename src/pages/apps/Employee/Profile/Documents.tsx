import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import classnames from 'classnames';
import config from "../../../../config";
import BASE_URL from '../../../../Base_URL/base_url';

// dummy data
// import { docs } from './data';
import Table from '../../../../components/Table';


/* action column render */
// const ActionColumn = ({ row }: { row: any }) => {
    
//     return (
//         <>
//             <Button variant="light" >
//                 <i className="mdi mdi-download"></i> 
//             </Button> {' '}
//             <Button variant="danger" >
//                 <i className="mdi mdi-close"></i> 
//             </Button>
//         </> 
//     );
// };

const ActionColumn = ({ row }: { row: any }) => {
    const handleDownload = async () => {
        try {
            // Log the download attempt
            console.log('Downloading file from:', row.original.document_file);

            // Fetch the file as a Blob
            const response = await fetch(row.original.document_file, {
                method: 'GET', // Assuming GET, update if necessary
                headers: {
                    'Authorization': `Bearer ${config.API_TOKEN}`, // If needed
                    'Content-Type': 'application/pdf'
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

    
    
   
    const handleDelete = async (id:Number) => {
        try {
           
            console.log(id)
            // const ducumentsID=id.toString()
            const formData = new FormData();
          
            formData.append('ducumentsID',id.toString());
            console.log(formData)
    
        
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
            } else {
                throw new Error('Failed to delete document');
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete the document.');
        }
    };
    
    return (
        // <button className="btn btn-light" onClick={handleDownload}>
        //     <i className="mdi mdi-download"></i>
        // </button>
        <>
                     <Button variant="light" onClick={handleDownload}>
                        <i className="mdi mdi-download"></i> 
                     </Button> {' '}
                    <Button variant="danger" onClick={() =>handleDelete(row.original.id)}>
                        <i className="mdi mdi-close"></i> 
                    </Button>
                 </> 
        
                        );
                    };
                    interface Docs {
                        id:number;
                        sn: number;
                        title:string;
                        document_file: string
                    }
                    interface DocsProp{
                        DocsData:Docs[];
                        setDocsDataMain: React.Dispatch<React.SetStateAction<Docs[]>>;
                    }

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
        Cell: ActionColumn
    },
];

const sizePerPageList = [
    {
        text: '5',
        value: 5,
    },
    {
        text: '10',
        value: 10,
    },
    {
        text: '25',
        value: 25,
    },
    {
        text: 'All',
        value:0,
    },
];

// feeds
const Documents : React.FC <DocsProp>=({DocsData,setDocsDataMain}) => {
    const [selectedFiles,setSelectedFiles]=useState<FileList|null>(null);
    const [documents, setDocuments] = useState<Docs[]>(DocsData);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setSelectedFiles(event.target.files);
        }
    };
    
    const handleUpload = async () => {
        if (selectedFiles && selectedFiles.length > 0) {
            const formData = new FormData();
            Array.from(selectedFiles).forEach(file => {
                formData.append('document_file', file);
            });

            formData.append('title', 'Your Default Title Here');

            const headers = {
                "Accept": "application/json",
                "Authorization": `Bearer ${config.API_TOKEN}`
            };

            try {
                const response = await fetch('http://35.154.28.156/api/upload-document', {
                    method: 'POST',
                    headers: headers,
                    body: formData,
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Upload successful:', result);
                    alert('Upload successful!');
                    // Update the documents state
                    // setDocuments([...documents, {
                    //     id: result.id,  // Assuming the API returns the new document's ID
                    //     sn: documents.length + 1,
                    //     title: result.title || 'New Document',  // Use title from result or a placeholder
                    //     document_file: result.document_file
                    // }]);
                    setDocsDataMain(prevDocs => [...prevDocs, {
                        id: result.id, // Ensure your backend returns the ID
                        sn: prevDocs.length + 1,
                        title: result.title || 'New Document',
                        document_file: result.document_file
                    }]);
                } else {
                    const errorResult = await response.json();
                    throw new Error(`Upload failed: ${errorResult.message || JSON.stringify(errorResult)}`);
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            alert('No file selected.');
        }
    };

    
let modifiedDocsData=DocsData.map((doc,index)=>({
    ...doc,
    sn:index+1
}))
    return (
        <>
           
            
            <Card>
                <Card.Body>
                
                         <input type="file" multiple onChange={handleFileChange} />
                    <Button variant='outline-primary'  onClick={handleUpload}
                    className="btn-sm waves-effect waves-light float-end">
                        <i className="mdi mdi-upload"
                        ></i> Upload
                    </Button>
                    <h4 className="header-title mb-3">Documents</h4>
                    <Row>
                           
                                <>
                                   <Table
                                        columns={columns}
                                        data={modifiedDocsData}
                                        pageSize={10}
                                        sizePerPageList={sizePerPageList}
                                        isSortable={false}
                                        pagination={false}
                                        isSearchable={false}
                                        tableClass="table-striped dt-responsive nowrap w-100"
                                    />
                                </>
                          
                    </Row>
                </Card.Body>
            </Card>
           
        </>
    );
};

export default Documents;
