import { useLocation } from "react-router-dom";
import AppName from "../../components/AppName";
import { Tabs } from "../../components/Tabs";
import { Tab } from '../../components/Tabs/tab';
import { Tools } from "../../core/enums";
import PageTemplate from "../PageTemplate";
import { Holder } from "../PageTemplate/styles";
import { AutoDepura } from "./AutoDepura/autoDepura";
import { ColiCalc } from "./ColiCalc/coliCalc";



export default function Home() {
    // /colicalc abre direto na aba do ColiCalc
    const { pathname } = useLocation();
    const abaInicial = pathname.toLowerCase() === '/colicalc' ? 1 : 0;

    return (
        <PageTemplate>
            <main>
                <AppName>
                    Calimpe-H20
                </AppName>
                <Holder>
                    <Tabs id='tabs' abaInicial={abaInicial}>
                        <Tab id={Tools.AutoDepura} label="Autodepura">
                            <AutoDepura />
                        </Tab>
                        <Tab id={Tools.ColiCalc} label="Colicalc">
                            <ColiCalc />
                        </Tab>
                        <Tab id={Tools.EutroFriza} label="EutroFriza">
                            <div>Em Breve</div>
                        </Tab>
                    </Tabs>
                </Holder>
            </main>
        </PageTemplate>
    );
}
