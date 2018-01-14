import React, { Component } from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';

function querySmartContractForJobs() {
  const job1 = {
    description: "job 1",
    payout: "1"
  }
  const job2 = {
    description: "job 2",
    payout: "2"
  }
  return[job1, job2];
}

const TableRow = ({row}) => (
  <tr>
    <td key={row.description}>{row.description}</td>
    <td key={row.payout}>{row.payout}</td>
  </tr>
)

const Table = ({data}) => (
  <table className="jobPostings">
    {data.map(row => {
      <TableRow row={row} />
    })}
  </table>
)


class JobsListing extends Component {

  displayJobListings() {
    const openJobs = querySmartContractForJobs()
    console.log("displayign job listings ", openJobs)
    return (<Table data={openJobs} />)
  }

  render() {
    return ([
      <div style={{color: this.props.muiTheme.palette.accent1Color}} className="jobPostings">
        <h3>Browse Available Jobs</h3>
      </div>,
      this.displayJobListings()
    ]);
  }
}

export default muiThemeable()(JobsListing);

