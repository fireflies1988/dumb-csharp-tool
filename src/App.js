import { Button, Checkbox, Col, Row, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
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
const placeholder = `Example:
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class PhotoTag
    {
        [JsonIgnore]
        public int PhotoId { get; set; }

        [JsonIgnore]
        public Photo? Photo { get; set; }

        public string? TagName { get; set; }
        [JsonIgnore]
        public Tag? Tag { get; set; }
    }
}`;
const spaces = 4;

function App() {
  const [input, setInput] = useState({ value: "", caret: -1, target: null });
  const [output, setOutput] = useState("");
  const [checked, setChecked] = useState(["1", "2"]);

  useEffect(() => {
    if (input.caret >= 0) {
      input.target.setSelectionRange(
        input.caret + spaces,
        input.caret + spaces
      );
    }
  }, [input]);

  function removeAttributesAndEmptyLines(input, options) {
    const lines = input.value.split("\n");

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

  function handleTab(e) {
    console.log(e);

    let content = e.target.value;
    let caret = e.target.selectionStart;

    if (e.key === "Tab") {
      e.preventDefault();

      let newText =
        content.substring(0, caret) +
        " ".repeat(spaces) +
        content.substring(caret);

      setInput({ value: newText, caret: caret, target: e.target });
    }
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
            rows={20}
            value={input.value}
            placeholder={placeholder}
            onChange={(e) =>
              setInput({ value: e.target.value, caret: -1, target: e.target })
            }
            onKeyDown={handleTab}
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

          <TextArea
            rows={20}
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            onKeyDown={handleTab}
          />
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
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Text type="secondary">©️ 2023 Kieu Huynh Thanh Tung</Text>
      </footer>
    </div>
  );
}

export default App;
