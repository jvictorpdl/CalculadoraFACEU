import { CardInput, CardHelp, Content } from "../styleSteps";
export default function Step0() {
  return (
    <Content>
      <CardInput>
        <div className="Container">
          <h5>Qr</h5>
          <input />

          <h5>ODr</h5>
          <input />

          <h5>DBOr</h5>
          <input />

          <h5>ODmin</h5>
          <input />
        </div>
      </CardInput>
      <CardHelp>ajuda 1</CardHelp>
    </Content>
  );
}
