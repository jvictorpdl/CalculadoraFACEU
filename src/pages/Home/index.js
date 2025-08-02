import AppName from "../../components/AppName";
import { Tabs } from "../../components/Tabs";
import { Tab } from '../../components/Tabs/tab';
import { Tools } from "../../core/enums";
import PageTemplate from "../PageTemplate";
import { Holder } from "../PageTemplate/styles";
import { AutoDepura } from "./AutoDepura/autoDepura";
import { ColiCalc } from "./ColiCalc/coliCalc";

import { FinishButton } from "./styles";


export default function Home() {
    return (
        <PageTemplate>
            <AppName>
                Calimpe-H20
            </AppName>
            <Holder>
                <Tabs id='tabs'>
                    <Tab id={Tools.AutoDepura} label="Autodepura">
                        <AutoDepura />
                    </Tab>
                    <Tab id={Tools.ColiCalc} label="Colicalc">
                        <ColiCalc />
                    </Tab>
                    <Tab id={Tools.EuroFriza} label="EuroFriza">
                        <div>Em Breve</div>
                    </Tab>
                </Tabs>
                <div style={{ display: 'flex', justifyContent: 'end', marginTop: '24px' }}>
                    <FinishButton onClick={() => console.log('Finish')}>
                        Finalizar
                    </FinishButton>
                </div>
            </Holder>
        </PageTemplate>
    );
}