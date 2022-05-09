import React from 'react';

function AutomobileList(props) {
    if (props.autos === undefined) {
      return null;
    }
    
    return (
        <React.Fragment>
        <div className="container">
            <table className="table table-striped">
            <thead>
                <tr>
                <th>Vin</th>
                <th>Color</th>
                <th>Year</th>
                <th>Model</th>
                <th>Manufacturer</th>
                </tr>
            </thead>
            <tbody>
                {props.autos.map(autos => {
                return (
                    <tr key={autos.vin}>
                    <td>{ autos.vin }</td>
                    <td>{ autos.color }</td>
                    <td>{ autos.year }</td>
                    <td>{ autos.model.name }</td>
                    <td>{ autos.model.manufacturer.name}</td>
                    </tr>
                );
                })}
            </tbody>
            </table>
        </div>
        </React.Fragment>
        );
        }

export default AutomobileList;