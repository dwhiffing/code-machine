export const PROTOTYPE_LEVEL = [
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

export const CAT_MACHINE_LEVEL = [
  { key: 'NegativeCell-22', x: 823, y: 775 },
  { key: 'PositiveCell-23', x: 916, y: 776 },
  { key: 'Light-24', x: 1411, y: 274 },
  { key: 'Switch-27', x: 1084, y: 214 },
  { key: 'Switch-28', x: 1082, y: 340 },
  { key: 'Switch-29', x: 1083, y: 459 },
  { key: 'Switch-30', x: 873, y: 614 },
  { key: 'Switch-31', x: 681, y: 460 },
  { key: 'Switch-32', x: 680, y: 300 },
  { key: 'Switch-33', x: 831, y: 299 },
  { key: 'Switch-34', x: 830, y: 459 },
  { key: 'Node-35', x: 553, y: 463 },
  { key: 'Node-36', x: 430, y: 465 },
  { key: 'Node-37', x: 422, y: 777 },
  { key: 'Node-38', x: 1403, y: 776 },
  { key: 'Node-39', x: 1214, y: 293 },
  { key: 'Node-40', x: 1218, y: 616 },
  { key: 'Node-41', x: 554, y: 617 },
  { key: 'Node-42', x: 1377, y: 455 },
  { key: 'Node-46', x: 556, y: 300 },
  { key: 'Node-55', x: 1218, y: 456 },
  { key: 'Node-63', x: 954, y: 297 },
  {
    key: 'Wire-NegativeCell-22:Node-37',
    input: 'NegativeCell-22',
    output: 'Node-37',
  },
  { key: 'Wire-Node-36:Node-37', input: 'Node-36', output: 'Node-37' },
  { key: 'Wire-Node-35:Node-36', input: 'Node-35', output: 'Node-36' },
  { key: 'Wire-Node-35:Node-46', input: 'Node-35', output: 'Node-46' },
  { key: 'Wire-Node-35:Node-41', input: 'Node-35', output: 'Node-41' },
  { key: 'Wire-Switch-30:Node-41', input: 'Switch-30', output: 'Node-41' },
  { key: 'Wire-Switch-30:Node-40', input: 'Switch-30', output: 'Node-40' },
  { key: 'Wire-Switch-31:Switch-34', input: 'Switch-31', output: 'Switch-34' },
  { key: 'Wire-Switch-32:Switch-33', input: 'Switch-32', output: 'Switch-33' },
  { key: 'Wire-Switch-27:Node-39', input: 'Switch-27', output: 'Node-39' },
  { key: 'Wire-Switch-28:Node-39', input: 'Switch-28', output: 'Node-39' },
  { key: 'Wire-Switch-29:Node-55', input: 'Switch-29', output: 'Node-55' },
  { key: 'Wire-Node-40:Node-55', input: 'Node-40', output: 'Node-55' },
  { key: 'Wire-Node-39:Node-55', input: 'Node-39', output: 'Node-55' },
  { key: 'Wire-Node-42:Node-55', input: 'Node-42', output: 'Node-55' },
  { key: 'Wire-Light-24:Node-42', input: 'Light-24', output: 'Node-42' },
  { key: 'Wire-Light-24:Node-38', input: 'Light-24', output: 'Node-38' },
  {
    key: 'Wire-PositiveCell-23:Node-38',
    input: 'PositiveCell-23',
    output: 'Node-38',
  },
  { key: 'Wire-Switch-28:Node-63', input: 'Switch-28', output: 'Node-63' },
  { key: 'Wire-Switch-27:Node-63', input: 'Switch-27', output: 'Node-63' },
  { key: 'Wire-Switch-33:Node-63', input: 'Switch-33', output: 'Node-63' },
  { key: 'Wire-Switch-32:Node-46', input: 'Switch-32', output: 'Node-46' },
  { key: 'Wire-Switch-29:Switch-34', input: 'Switch-29', output: 'Switch-34' },
  { key: 'Wire-Switch-31:Node-35', input: 'Switch-31', output: 'Node-35' },
]

export const FEEDBACK_LEVEL = [
  { key: 'Light-29', x: 1430, y: 423 },
  { key: 'PositiveCell-35', x: 1080, y: 693 },
  { key: 'NegativeCell-36', x: 962, y: 697 },
  { key: 'Node-43', x: 899, y: 446 },
  { key: 'Switch-48', x: 684, y: 415, v: 1 },
  { key: 'Switch-53', x: 1022, y: 189 },
  { key: 'Magnet-57', x: 1055, y: 400 },
  {
    key: 'Wire-Light-29:PositiveCell-35',
    input: 'Light-29',
    output: 'PositiveCell-35',
  },
  { key: 'Wire-Node-43:Switch-48', input: 'Node-43', output: 'Switch-48' },
  { key: 'Wire-Switch-48:Switch-53', input: 'Switch-48', output: 'Switch-53' },
  { key: 'Wire-Light-29:Switch-53', input: 'Light-29', output: 'Switch-53' },
  {
    key: 'Wire-NegativeCell-36:Magnet-57',
    input: 'NegativeCell-36',
    output: 'Magnet-57',
  },
  { key: 'Wire-Node-43:Magnet-57', input: 'Node-43', output: 'Magnet-57' },
  { key: 'Wire-Switch-53:Magnet-57', input: 'Switch-53', output: 'Magnet-57' },
]
