import { StiledTable } from "./style"


export default function Table(props) {
    return (

        <StiledTable>

            <tr>

                {props.table.header.map((th, index) => {
                    return (
                        <th key={index} colSpan={th.colspan} rowSpan={th.rowspan}>
                            {th.content}
                    
                            {th.sub &&
                                <sub>{th.sub}</sub>
                            }
                            {th.mid}
                            {th.up &&

                                <sup>{th.up}</sup>
                            }
                            {th.final}
                        </th>
                    )
                })}
            </tr>

            {props.table.lines.map((tr, index) => {
                return (
                    <tr key={index} colSpan={tr.colspan} rowSpan={tr.rowspan}>
                        {tr.map((td, i) => {

                            return (
                                <td key={i + "a"} colSpan={td.colspan} rowSpan={td.rowspan}>
                                    {td.content}
                                </td>
                            )
                        })}
                    </tr>
                )


            })}
        </StiledTable>
    )
}