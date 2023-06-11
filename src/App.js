import { Button, Checkbox, Col, Row, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
const { Text } = Typography;

const options = [
  {
    label: "Attributes",
    value: "1",
  },
  {
    label: "Empty Lines",
    value: "2",
  },
];

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [checked, setChecked] = useState(["1", "2"]);

  function removeAttributesAndEmptyLines(input, options) {
    const lines = input.split("\n");

    const filteredLines = lines.filter((line) => {
      let hasAttribute = false;
      let isEmpty = false;

      if (options.includes("1")) {
        hasAttribute = line.includes("[") && line.includes("]");
      }

      if (options.includes("2")) {
        isEmpty = line.trim() === "";
      }

      return !hasAttribute && !isEmpty;
    });

    setOutput(filteredLines.join("\n"));
  }

  return (
    <div
      style={{
        maxWidth: "1300px",
        margin: "auto",
        paddingLeft: "1rem",
        paddingRight: "1rem",
      }}
    >
      <h2>Remove attributes and empty lines from a C# class</h2>

      <Checkbox.Group
        options={options}
        defaultValue={checked}
        onChange={(checked) => setChecked(checked)}
      />

      <Row gutter={16}>
        <Col span={12}>
          <h2>Input</h2>
          <TextArea
            rows={23}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Col>
        <Col span={12}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Output</h2>
            <Button
              type="primary"
              onClick={() => navigator.clipboard.writeText(output)}
            >
              Copy
            </Button>
          </div>

          <TextArea rows={23} readOnly value={output} />
        </Col>
      </Row>

      <div
        style={{ display: "flex", marginTop: "1rem", justifyContent: "center" }}
      >
        <Button
          type="primary"
          onClick={() => removeAttributesAndEmptyLines(input, checked)}
        >
          Convert
        </Button>
      </div>

      <footer
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        <Text type="secondary">©️ 2023 Kieu Huynh Thanh Tung</Text>
      </footer>
    </div>
  );
}

export default App;
