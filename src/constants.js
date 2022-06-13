export const LEVEL = [
  { key: 'Light-0', x: 1500, y: 500 },
  { key: 'Switch-1', x: 950, y: 200 },
  { key: 'PositiveCell-2', x: 400, y: 450 },
  { key: 'NegativeCell-3', x: 400, y: 550 },
  { key: 'Node-4', x: 400, y: 800 },
  { key: 'Node-5', x: 1500, y: 800 },
  { key: 'Node-6', x: 1500, y: 200 },
  { key: 'Node-7', x: 400, y: 200 },
  { key: 'Magnet-8', x: 952, y: 437 },
  { key: 'Node-9', x: 1118, y: 545 },
  { key: 'Node-10', x: 1120, y: 434 },
  {
    key: 'Wire-NegativeCell-3:Node-4',
    input: 'NegativeCell-3',
    output: 'Node-4',
  },
  { key: 'Wire-Node-4:Node-5', input: 'Node-4', output: 'Node-5' },
  { key: 'Wire-Light-0:Node-5', input: 'Light-0', output: 'Node-5' },
  { key: 'Wire-Light-0:Node-6', input: 'Light-0', output: 'Node-6' },
  { key: 'Wire-Switch-1:Node-6', input: 'Switch-1', output: 'Node-6' },
  { key: 'Wire-Switch-1:Node-7', input: 'Switch-1', output: 'Node-7' },
  {
    key: 'Wire-PositiveCell-2:Node-7',
    input: 'PositiveCell-2',
    output: 'Node-7',
  },
  {
    key: 'Wire-NegativeCell-3:Node-9',
    input: 'NegativeCell-3',
    output: 'Node-9',
  },
  { key: 'Wire-Node-9:Node-10', input: 'Node-9', output: 'Node-10' },
  { key: 'Wire-Magnet-8:Node-10', input: 'Magnet-8', output: 'Node-10' },
  { key: 'Wire-Switch-1:Magnet-8', input: 'Switch-1', output: 'Magnet-8' },
]
