# Virtualized Tree 🌳

`virtualized-tree` is a highly customizable React component for rendering large datasets in a tree structure with virtualization for performance. It includes features like expandable/collapsible nodes and customizable sorting.


---


## Features

- **Virtualized Rendering**: Efficiently renders only the visible nodes, making it ideal for large datasets.
- **Expandable/Collapsible Nodes**: Dynamically expand or collapse tree nodes.
- **Customizable Sorting**: Sort nodes alphabetically or by value in ascending/descending order.
- **Lightweight**: Built with react-window for optimal performance.
- **Customizable Styles**: Fully customizable via `TreeStyles`.

---

## Installation

Install the package using npm or yarn:

```bash
npm install virtualized-tree-react
```
or
```bash
yarn add virtualized-tree-react

```

---

## Usage

### Basic Example

```tsx
import React from 'react';
import { VirtualizedTree } from 'virtualized-tree';

const data = {
  "id": "0b",
  "name": "person",
  "value": 10000,
  "children": [
    {
      "id": "c7107b09-f1bb-4ce4-8532-4da39c508c0f",
      "name": "birthday",
      "value": 10000,
      "children": [
        {
          "id": "82f3f6fb-1359-49be-a0a3-17bcc04be935",
          "name": "2020-06-22 17:51:34",
          "value": 1
        },
        {
          "id": "8a0d098f-7fa6-4610-92d6-1ad40d1717e8",
          "name": "2020-07-04 11:31:48",
          "value": 1
        }
      ]
    },
    {
      "id": "58f64988-9e34-4cc0-8635-47d205f5d691",
      "name": "location",
      "value": 10000,
      "children": [
        {
          "id": "3d851322-16ee-43c1-8fbe-3294b41feba0",
          "name": "-75.449, 29.765",
          "value": 1
        },
        {
          "id": "c4eb9908-21f2-4b00-8deb-8584c4b89207",
          "name": "-62.0028, 74.1975",
          "value": 1
        },
        {
          "id": "3c984220-7a46-40cf-9dcc-857bfd9b2312",
          "name": "-7.7063, -157.832",
          "value": 1
        }
      ]
    }
  ]
};

export const App = () => (
  <VirtualizedTree
    data={data}
    label="name"
    countKey="value"
    onNodeClick={(node) => console.log('Node clicked:', node)}
  />
);
```

---

## Props

| Prop           | Type                        | Required | Default | Description |
|----------------|---------------------------|----------|---------|-------------|
| `data`         | `TreeNode`                 | Yes      | -       | The root node of the tree. |
| `label`        | `string`                   | Yes      | -       | The key used to display the label of each node. |
| `children`     | `string`                   | No       | "children" | The key that contains child nodes. |
| `countKey`     | `string`                   | No       | -       | The key used to display node-specific values (e.g., counts). |
| `className`    | `string`                   | No       | -       | Custom CSS classes for the tree container. |
| `itemSize`     | `number`                   | No       | 40      | The height of each tree node in pixels. |
| `height`       | `number`                   | No       | 400     | The height of the tree container in pixels. |
| `onNodeClick`  | `(node: TreeNode) => void` | No       | -       | Callback triggered when a node is clicked. |
| `styles`       | `TreeStyles`               | No       | -       | Custom styles for the tree and its elements. |

---

## Advanced Features
You can pass a styles prop to customize the tree's appearance. Example:

```tsx
const styles = {
  container: "border shadow-lg",
  row: "hover:bg-gray-200",
  toggleButton: "text-blue-500",
  label: "font-semibold",
  value: "text-gray-600",
  icons: {
    expanded: <ChevronDown />,
    collapsed: <ChevronRight />,
  },
};
```

## License

MIT © [Taha](https://github.com/taha-farzalizadeh)

---

## Links

- [GitHub Repository](https://github.com/taha-farzalizadeh/virtualized-tree)
- [Issues](https://github.com/taha-farzalizadeh/virtualized-tree/issues)

