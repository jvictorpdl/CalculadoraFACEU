import { useLocation } from "react-router-dom";
import AppName from "../../components/AppName";
import { Tabs } from "../../components/Tabs";
import { Tab } from '../../components/Tabs/tab';
import { Tools } from "../../core/enums";
import PageTemplate from "../PageTemplate";
import { Holder } from "../PageTemplate/styles";
import { AutoDepura } from "./AutoDepura/autoDepura";
import { ColiCalc } from "./ColiCalc/coliCalc";
import { EutroFriza } from "./EutroFriza/eutroFriza";



export default function Home() {
    // /colicalc e /eutrofriza abrem direto na aba da calculadora
    const { pathname } = useLocation();
    const abaInicial = { '/colicalc': 1, '/eutrofriza': 2 }[pathname.toLowerCase()] ?? 0;

    return (
        <PageTemplate>
            <main>
                <AppName>
                    Calimpe-H20
                </AppName>
                <Holder>
                    <Tabs id='tabs' abaInicial={abaInicial}>
                        <Tab id={Tools.AutoDepura} label="AutoDepura">
                            <AutoDepura />
                        </Tab>
                        <Tab id={Tools.ColiCalc} label="ColiCalc">
                            <ColiCalc />
                        </Tab>
                        <Tab id={Tools.EutroFriza} label="EutroFriza">
                            <EutroFriza />
                        </Tab>
                    </Tabs>
                </Holder>
            </main>
        </PageTemplate>
    );
}
