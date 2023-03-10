import { CardInput, CardHelp, Content } from "../styleSteps";
import {Input} from "../../../components/Input"
import ItemForm from "../../../components/ItemForm";
export default function Step0() {
  return (
    <Content>
      <CardInput>
        <div className="Container">
          <ItemForm title="Qr" />

          <h5>ODr</h5>
          <Input />

          <h5>DBOr</h5>
          <Input />

          <h5>ODmin</h5>
          <Input />
        </div>
      </CardInput>
      <CardHelp>ajuda 1</CardHelp>
    </Content>
  );
}
