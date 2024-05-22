import React, { useState, useEffect }  from 'react';

import image from "./../assets/images/no_data_found 1.png";
const DataNotAvailable = () => {
    return (
        <React.Fragment>
            <div className="container-fluid d-flex vh-100" style={{position:"fixed"}}>
                <div className="row m-auto">
                    <div className="col-auto text-center">
                        <img src={image} alt="No Data" className="img-fluid" style={{ maxWidth: '60%', maxHeight: '60%' }} />
                        <p className='text-secondary mt-1'>No Data Found</p>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default DataNotAvailable;