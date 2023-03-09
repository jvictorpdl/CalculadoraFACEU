import { CardInput, CardHelp, Content } from "../styleSteps";
export default function Step2() {
  return (
    <Content>
      <CardInput>
        <div className="Container">
          <h5>k1(20ºC)</h5>
          <input />
          <h5>θ</h5>
          <input />
          <h5>T</h5>
          <input />
          <br />
        </div>

        <h3 className="text1">Ou</h3>

        <div>
          <h5>
            K1<sub>t</sub>
          </h5>
          <input />
        </div>
      </CardInput>
      <CardHelp>ajuda 2</CardHelp>
    </Content>
  );
}
