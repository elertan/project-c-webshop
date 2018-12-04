import * as React from 'react';

class BirthMonths extends React.Component {
    public render() {
        return (
            <select name="birthDayMonth" id="month">
                <option value="" disabled>Month</option>
                <option value="january">January</option>
                <option value="february">February</option>
                <option value="march">March</option>
                <option value="april">April</option>
                <option value="may">May</option>
                <option value="june">June</option>
                <option value="july">July</option>
                <option value="august">August</option>
                <option value="september">September</option>
                <option value="october">October</option>
                <option value="november">November</option>
                <option value="december">December</option>
            </select>
        )
    }
}

export default BirthMonths;
