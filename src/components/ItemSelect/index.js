import { Container } from "./styles";
import { Select } from "../Select";

const ItemSelect = ({ options }) => {
  return (
    <Container>
      <label htmlFor="my-select">Fórmula</label>
      <Select id="my-select" name="my-select">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </Container>
  );
};

export default ItemSelect;
