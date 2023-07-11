import Form from "../../../components/Form";
import ItemForm from "../../../components/ItemForm";
import { CardInput, CardHelp, Content } from "../styleSteps";
import { Subtitle } from "../../../components/Subtitle/styles";
import { useState } from "react";
import { Lancamentos } from "./styles";

export default function Step7(props) {

    function adicionarLancamento() {
        props.data.lancamentos.push({
            qe: 0,
            ode: 0,
            dboe: 0,
        })
        props.setData({ ...props.data, lancamentos: [...props.data.lancamentos] })
        console.log(props.data);
    }
    return (
        //metodos slace e splace
        <Content>
            <CardInput>
                <Lancamentos>
                    {props.data.lancamentos && props.data.lancamentos.map((lancamento, index) => {
                        return (

                            <li key={index}>

                                <ItemForm
                                    title="Qe"
                                    unity="m³/s"
                                    value={lancamento.qe}
                                    handle={(value) => { lancamento.qe = value; props.setData({ ...props.data }) }}
                                    data={lancamento} />
                                <ItemForm
                                    title="ODe"
                                    unity="m³/s"
                                    value={lancamento.ode}
                                    handle={(value) => { lancamento.ode = value; props.setData({ ...props.data }) }}
                                    data={lancamento} />
                                <ItemForm
                                    title="DBOe"
                                    unity="m³/s"
                                    value={lancamento.dboe}
                                    handle={(value) => { lancamento.dboe = value; props.setData({ ...props.data }) }}
                                    data={lancamento} />
                            </li>

                        )
                    })}
                    <li>
                        <button onClick={() => adicionarLancamento()}>+</button>
                    </li>
                </Lancamentos>
            </CardInput>

        </Content>
    );
}
