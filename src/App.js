import { Button, Checkbox, Col, Row, Typography } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useState } from "react";
const { Text } = Typography;

const options = [
  {
    label: "Remove Attributes",
    value: "1",
  },
  {
    label: "Remove Constructors and Methods",
    value: "2",
  },
  {
    label: "Remove Region Directives",
    value: "3",
  },
  {
    label: "Remove Empty Lines",
    value: "4",
  },
  {
    label: "Format Code",
    value: "5",
  }
];
const inputPlaceHolder = `using System.Text.Json.Serialization;
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
const outputPlaceHolder = `using System.Text.Json.Serialization;
using System.Threading.Tasks;
namespace Domain.Entities
{
    public class PhotoTag
    {
        public int PhotoId { get; set; }
        public Photo? Photo { get; set; }
        public string? TagName { get; set; }
        public Tag? Tag { get; set; }
    }
}`;

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [checked, setChecked] = useState(["1", "2", "3", "4", "5"]);

  function handleConvertClick(input, options) {
    let output = input;

    // Remove attributes (e.g., [JsonIgnore])
    if (options.includes("1")) {
      output = input.replace(/[ \t]*\[[^\]]+\]\s*/g, "");
    }

    // Remove constructors and functions
    if (options.includes("2"))
      output = output.replace(
        /(public|private|protected|internal|static)?\s+\w+\s+\w+\s*\([^)]*\)\s*{([^{}]*{[^{}]*}[^{}]*|[^{}])*}/g,
        ""
      );

    // Remove region directives
    if (options.includes("3")) {
      output = output.replace(/[ \t]*#(region|endregion).*/g, "")
    }

    // Remove empty lines
    if (options.includes("4")) {
      output = output.replace(/^\s*[\r\n]/gm, "");
    }

    if (options.includes("5") && output.trim()) {
      output = formatCode(output);
    }

    setOutput(output);
  }

  function formatCode(input) {
    let output = "";
    let indentLevel = 0;
    const indentSize = 4; // You can adjust the indentation size as needed

    // Split the input into lines
    const lines = input.split("\n");

    // Iterate through each line
    for (const line of lines) {
      const trimmedLine = line.trim();

      // Decrease the indent level for closing braces
      if (trimmedLine === "}") {
        indentLevel--;
      }

      // Add the current line with proper indentation
      if (indentLevel > 0) {
        output += " ".repeat(indentLevel * indentSize);
      }
      output += line.trim() + "\n";

      // Increase the indent level for opening braces
      if (trimmedLine.endsWith("{")) {
        indentLevel++;
      }
    }

    return output;
  }

  function handleTabKeyPress(e, setState) {
    if (e.key === "Tab") {
      e.preventDefault();

      // Insert a tab character ('\t') at the current cursor position
      const { selectionStart, selectionEnd } = e.target;
      let newText =
        e.target.value.substring(0, selectionStart) +
        "\t" +
        e.target.value.substring(selectionEnd);

      setState(newText);

      // Move the cursor after the inserted tab
      e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
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
      <h2>Format a C# class</h2>

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
            value={input}
            placeholder={inputPlaceHolder}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => handleTabKeyPress(e, setInput)}
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
            placeholder={outputPlaceHolder}
            onChange={(e) => setOutput(e.target.value)}
            onKeyDown={(e) => handleTabKeyPress(e, setOutput)}
          />
        </Col>
      </Row>

      <div
        style={{ display: "flex", marginTop: "1rem", justifyContent: "center" }}
      >
        <Button type="primary" onClick={() => handleConvertClick(input, checked)}>
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
