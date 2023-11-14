const Response = ({ data }: { data: any }) => {
    return (
        <div>
            <table border={1}>
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(data).map(([city, temperature]) => {
                        return <tr key={city}>
                            <td>{city}</td>
                            <td>{temperature as string}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Response
