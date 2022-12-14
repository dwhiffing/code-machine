export const LEVELS = {
  FEEDBACK_LEVEL: [
    { key: 'Light-1', x: 1091, y: 458, v: 1 },
    { key: 'Cell-2', x: 1085, y: 693, v: 0, p: 1 },
    { key: 'Cell-3', x: 962, y: 697, v: 0, p: -1 },
    { key: 'Node-4', x: 821, y: 567, v: 1 },
    { key: 'Switch-5', x: 827, y: 462, v: 1 },
    { key: 'Switch-6', x: 961, y: 461, v: 0 },
    { key: 'Magnet-7', x: 958, y: 567, v: 1, p: -1 },
    { key: 'Wire-Light-1:Cell-2' },
    { key: 'Wire-Node-4:Switch-5' },
    { key: 'Wire-Switch-5:Switch-6' },
    { key: 'Wire-Light-1:Switch-6' },
    { key: 'Wire-Cell-3:Magnet-7' },
    { key: 'Wire-Node-4:Magnet-7' },
    { key: 'Wire-Switch-6:Magnet-7' },
  ],
  CAT_MACHINE_LEVEL_1: [
    { key: 'Cell-1', x: 823, y: 775, v: 0, p: -1 },
    { key: 'Cell-2', x: 916, y: 776, v: 0, p: 1 },
    { key: 'Light-3', x: 1411, y: 274, v: 0 },
    { key: 'Switch-4', x: 1084, y: 214 },
    { key: 'Switch-5', x: 1082, y: 340 },
    { key: 'Switch-6', x: 1083, y: 459 },
    { key: 'Switch-7', x: 873, y: 614 },
    { key: 'Switch-8', x: 681, y: 460 },
    { key: 'Switch-9', x: 680, y: 300 },
    { key: 'Switch-10', x: 831, y: 299 },
    { key: 'Switch-11', x: 830, y: 459 },
    { key: 'Node-12', x: 553, y: 463, v: 0 },
    { key: 'Node-13', x: 430, y: 465, v: 0 },
    { key: 'Node-14', x: 422, y: 777, v: 0 },
    { key: 'Node-15', x: 1403, y: 776, v: 0 },
    { key: 'Node-16', x: 1214, y: 293, v: 0 },
    { key: 'Node-17', x: 1218, y: 616, v: 0 },
    { key: 'Node-18', x: 554, y: 617, v: 0 },
    { key: 'Node-19', x: 1377, y: 455, v: 0 },
    { key: 'Node-20', x: 556, y: 300, v: 0 },
    { key: 'Node-21', x: 1218, y: 456, v: 0 },
    { key: 'Node-22', x: 954, y: 297, v: 0 },
    { key: 'Wire-Cell-1:Node-14' },
    { key: 'Wire-Node-13:Node-14' },
    { key: 'Wire-Node-12:Node-13' },
    { key: 'Wire-Node-12:Node-20' },
    { key: 'Wire-Node-12:Node-18' },
    { key: 'Wire-Switch-7:Node-18' },
    { key: 'Wire-Switch-7:Node-17' },
    { key: 'Wire-Switch-8:Switch-11' },
    { key: 'Wire-Switch-9:Switch-10' },
    { key: 'Wire-Switch-4:Node-16' },
    { key: 'Wire-Switch-5:Node-16' },
    { key: 'Wire-Switch-6:Node-21' },
    { key: 'Wire-Node-17:Node-21' },
    { key: 'Wire-Node-16:Node-21' },
    { key: 'Wire-Node-19:Node-21' },
    { key: 'Wire-Light-3:Node-19' },
    { key: 'Wire-Light-3:Node-15' },
    { key: 'Wire-Cell-2:Node-15' },
    { key: 'Wire-Switch-5:Node-22' },
    { key: 'Wire-Switch-4:Node-22' },
    { key: 'Wire-Switch-10:Node-22' },
    { key: 'Wire-Switch-9:Node-20' },
    { key: 'Wire-Switch-6:Switch-11' },
    { key: 'Wire-Switch-8:Node-12' },
  ],
  AND_GATES: [
    { key: 'Cell-1', x: 658, y: 247, v: 0, p: -1 },
    { key: 'Cell-2', x: 1303, y: 961, v: 0, p: 1 },
    { key: 'Switch-3', x: 1298, y: 238, v: 0 },
    { key: 'Magnet-4', x: 1152, y: 243, v: 0, p: 1 },
    { key: 'Switch-6', x: 765, y: 244, v: 0 },
    { key: 'Node-8', x: 1071, y: 244, v: 0 },
    { key: 'Cell-11', x: 1151, y: 342, v: 0, p: 1 },
    { key: 'Cell-13', x: 665, y: 538, v: 0, p: -1 },
    { key: 'Switch-14', x: 1301, y: 539, v: 0 },
    { key: 'Magnet-15', x: 1164, y: 540, v: 0, p: 1 },
    { key: 'Switch-16', x: 761, y: 537, v: 0 },
    { key: 'Node-17', x: 1090, y: 540, v: 0 },
    { key: 'Cell-18', x: 1166, y: 662, v: 0, p: 1 },
    { key: 'Light-24', x: 1304, y: 774, v: 0 },
    { key: 'Cell-25', x: 1297, y: 83, v: 0, p: -1 },
    { key: 'Wire-Switch-3:Magnet-4' },
    { key: 'Wire-Cell-1:Switch-6' },
    { key: 'Wire-Magnet-4:Node-8' },
    { key: 'Wire-Switch-6:Node-8' },
    { key: 'Wire-Magnet-4:Cell-11' },
    { key: 'Wire-Switch-14:Magnet-15' },
    { key: 'Wire-Cell-13:Switch-16' },
    { key: 'Wire-Magnet-15:Node-17' },
    { key: 'Wire-Switch-16:Node-17' },
    { key: 'Wire-Magnet-15:Cell-18' },
    { key: 'Wire-Switch-3:Cell-25' },
    { key: 'Wire-Cell-2:Light-24' },
    { key: 'Wire-Switch-3:Switch-14' },
    { key: 'Wire-Switch-14:Light-24' },
  ],
  OR_GATES: [
    { key: 'Cell-1', x: 533, y: 244, v: 0, p: -1 },
    { key: 'Cell-2', x: 1329, y: 885, v: 0, p: 1 },
    { key: 'Switch-3', x: 1120, y: 233, v: 0 },
    { key: 'Magnet-4', x: 994, y: 240, v: 0, p: 1 },
    { key: 'Switch-6', x: 640, y: 241, v: 0 },
    { key: 'Node-8', x: 906, y: 246, v: 0 },
    { key: 'Cell-11', x: 997, y: 344, v: 0, p: 1 },
    { key: 'Cell-13', x: 534, y: 553, v: 0, p: -1 },
    { key: 'Switch-14', x: 1128, y: 541, v: 0 },
    { key: 'Magnet-15', x: 1007, y: 542, v: 0, p: 1 },
    { key: 'Switch-16', x: 645, y: 550, v: 0 },
    { key: 'Node-17', x: 928, y: 546, v: 0 },
    { key: 'Cell-18', x: 1000, y: 642, v: 0, p: 1 },
    { key: 'Light-24', x: 1331, y: 787, v: 0 },
    { key: 'Cell-25', x: 1122, y: 133, v: 0, p: -1 },
    { key: 'Node-55', x: 1331, y: 540, v: 0 },
    { key: 'Cell-62', x: 1129, y: 437, v: 0, p: -1 },
    { key: 'Node-83', x: 1335, y: 234, v: 0 },
    { key: 'Wire-Switch-3:Magnet-4' },
    { key: 'Wire-Cell-1:Switch-6' },
    { key: 'Wire-Magnet-4:Node-8' },
    { key: 'Wire-Switch-6:Node-8' },
    { key: 'Wire-Magnet-4:Cell-11' },
    { key: 'Wire-Switch-14:Magnet-15' },
    { key: 'Wire-Cell-13:Switch-16' },
    { key: 'Wire-Magnet-15:Node-17' },
    { key: 'Wire-Switch-16:Node-17' },
    { key: 'Wire-Magnet-15:Cell-18' },
    { key: 'Wire-Switch-3:Cell-25' },
    { key: 'Wire-Cell-2:Light-24' },
    { key: 'Wire-Switch-14:Node-55' },
    { key: 'Wire-Switch-14:Cell-62' },
    { key: 'Wire-Light-24:Node-55' },
    { key: 'Wire-Switch-3:Node-83' },
    { key: 'Wire-Node-55:Node-83' },
  ],
  AND_GATES_2: [
    { key: 'Cell-1', x: -120, y: -261, v: 0, p: -1 },
    { key: 'Switch-3', x: 1311, y: 342, v: 1 },
    { key: 'Magnet-4', x: 1165, y: 347, v: 1, p: 1 },
    { key: 'Switch-6', x: -13, y: -264, v: 0 },
    { key: 'Node-8', x: 1084, y: 348, v: 1 },
    { key: 'Cell-11', x: 1164, y: 446, v: 0, p: 1 },
    { key: 'Cell-13', x: -129, y: 398, v: 0, p: -1 },
    { key: 'Switch-14', x: 1301, y: 546, v: 0 },
    { key: 'Magnet-15', x: 1164, y: 547, v: 0, p: 1 },
    { key: 'Switch-16', x: -14, y: 402, v: 0 },
    { key: 'Node-17', x: 1090, y: 547, v: 0 },
    { key: 'Cell-18', x: 1160, y: 653, v: 0, p: 1 },
    { key: 'Switch-42', x: 1307, y: 913, v: 0 },
    { key: 'Magnet-43', x: 1161, y: 918, v: 0, p: 1 },
    { key: 'Node-44', x: 980, y: 919, v: 0 },
    { key: 'Cell-45', x: 1160, y: 1017, v: 0, p: 1 },
    { key: 'Switch-46', x: 1301, y: 1117, v: 0 },
    { key: 'Magnet-47', x: 1159, y: 1118, v: 0, p: 1 },
    { key: 'Node-48', x: 1085, y: 1118, v: 0 },
    { key: 'Cell-49', x: 1156, y: 1223, v: 0, p: 1 },
    { key: 'Switch-59', x: 1319, y: -739, v: 1 },
    { key: 'Magnet-60', x: 1173, y: -734, v: 1, p: 1 },
    { key: 'Node-61', x: 728, y: -724, v: 1 },
    { key: 'Cell-62', x: 1172, y: -635, v: 0, p: 1 },
    { key: 'Switch-63', x: 1309, y: -535, v: 1 },
    { key: 'Magnet-64', x: 1172, y: -534, v: 1, p: 1 },
    { key: 'Node-65', x: 642, y: -534, v: 1 },
    { key: 'Cell-66', x: 1168, y: -429, v: 0, p: 1 },
    { key: 'Switch-68', x: 1315, y: -212, v: 0 },
    { key: 'Magnet-69', x: 1169, y: -207, v: 0, p: 1 },
    { key: 'Node-70', x: 958, y: -202, v: 0 },
    { key: 'Cell-71', x: 1168, y: -108, v: 0, p: 1 },
    { key: 'Switch-72', x: 1305, y: -8, v: 1 },
    { key: 'Magnet-73', x: 1168, y: -7, v: 1, p: 1 },
    { key: 'Node-74', x: 1094, y: -7, v: 1 },
    { key: 'Cell-75', x: 1164, y: 99, v: 0, p: 1 },
    { key: 'Node-93', x: 184, y: -263, v: 0 },
    { key: 'Node-94', x: 188, y: 351, v: 0 },
    { key: 'Magnet-104', x: 444, y: 341, v: 0, p: -1 },
    { key: 'Switch-106', x: 445, y: 234, v: 1 },
    { key: 'Node-108', x: 365, y: 350, v: 0 },
    { key: 'Magnet-113', x: 424, y: -265, v: 0, p: -1 },
    { key: 'Switch-114', x: 437, y: -372, v: 1 },
    { key: 'Node-115', x: 340, y: -261, v: 0 },
    { key: 'Node-120', x: 191, y: -474, v: 0 },
    { key: 'Node-121', x: 181, y: 1117, v: 0 },
    { key: 'Node-124', x: 871, y: 1108, v: 0 },
    { key: 'Node-127', x: 867, y: 560, v: 0 },
    { key: 'Node-130', x: 177, y: 122, v: 0 },
    { key: 'Node-131', x: 978, y: 124, v: 0 },
    { key: 'Node-135', x: 729, y: -379, v: 1 },
    { key: 'Node-138', x: 733, y: 362, v: 1 },
    { key: 'Node-143', x: 636, y: 240, v: 1 },
    { key: 'Light-148', x: 1457, y: -116, v: 0 },
    { key: 'Light-149', x: 1476, y: -664, v: 1 },
    { key: 'Light-150', x: 1444, y: 423, v: 0 },
    { key: 'Light-151', x: 1453, y: 990, v: 0 },
    { key: 'Cell-156', x: 548, y: 338, v: 0, p: 1 },
    { key: 'Cell-158', x: 340, y: 240, v: 0, p: -1 },
    { key: 'Cell-160', x: 521, y: -266, v: 0, p: 1 },
    { key: 'Cell-161', x: 335, y: -378, v: 0, p: -1 },
    { key: 'Cell-169', x: 1323, y: -303, v: 0, p: -1 },
    { key: 'Cell-171', x: 1319, y: -830, v: 0, p: -1 },
    { key: 'Cell-172', x: 1312, y: 239, v: 0, p: -1 },
    { key: 'Cell-173', x: 1312, y: 818, v: 0, p: -1 },
    { key: 'Cell-177', x: 1589, y: -662, v: 0, p: 1 },
    { key: 'Cell-178', x: 1588, y: -116, v: 0, p: 1 },
    { key: 'Cell-179', x: 1576, y: 422, v: 0, p: 1 },
    { key: 'Cell-180', x: 1620, y: 993, v: 0, p: 1 },
    { key: 'Node-189', x: 964, y: -475, v: 0 },
    { key: 'Node-194', x: 636, y: 10, v: 1 },
    { key: 'Wire-Switch-3:Magnet-4' },
    { key: 'Wire-Cell-1:Switch-6' },
    { key: 'Wire-Magnet-4:Node-8' },
    { key: 'Wire-Magnet-4:Cell-11' },
    { key: 'Wire-Switch-14:Magnet-15' },
    { key: 'Wire-Cell-13:Switch-16' },
    { key: 'Wire-Magnet-15:Node-17' },
    { key: 'Wire-Magnet-15:Cell-18' },
    { key: 'Wire-Switch-3:Switch-14' },
    { key: 'Wire-Switch-42:Magnet-43' },
    { key: 'Wire-Magnet-43:Node-44' },
    { key: 'Wire-Magnet-43:Cell-45' },
    { key: 'Wire-Switch-46:Magnet-47' },
    { key: 'Wire-Magnet-47:Node-48' },
    { key: 'Wire-Magnet-47:Cell-49' },
    { key: 'Wire-Switch-42:Switch-46' },
    { key: 'Wire-Switch-59:Magnet-60' },
    { key: 'Wire-Magnet-60:Node-61' },
    { key: 'Wire-Magnet-60:Cell-62' },
    { key: 'Wire-Switch-63:Magnet-64' },
    { key: 'Wire-Magnet-64:Node-65' },
    { key: 'Wire-Magnet-64:Cell-66' },
    { key: 'Wire-Switch-59:Switch-63' },
    { key: 'Wire-Switch-68:Magnet-69' },
    { key: 'Wire-Magnet-69:Node-70' },
    { key: 'Wire-Magnet-69:Cell-71' },
    { key: 'Wire-Switch-72:Magnet-73' },
    { key: 'Wire-Magnet-73:Node-74' },
    { key: 'Wire-Magnet-73:Cell-75' },
    { key: 'Wire-Switch-68:Switch-72' },
    { key: 'Wire-Magnet-104:Switch-106' },
    { key: 'Wire-Magnet-104:Node-108' },
    { key: 'Wire-Switch-16:Node-94' },
    { key: 'Wire-Node-94:Node-108' },
    { key: 'Wire-Magnet-113:Switch-114' },
    { key: 'Wire-Magnet-113:Node-115' },
    { key: 'Wire-Switch-6:Node-93' },
    { key: 'Wire-Node-93:Node-115' },
    { key: 'Wire-Node-94:Node-121' },
    { key: 'Wire-Node-93:Node-120' },
    { key: 'Wire-Node-121:Node-124' },
    { key: 'Wire-Node-48:Node-124' },
    { key: 'Wire-Node-124:Node-127' },
    { key: 'Wire-Node-17:Node-127' },
    { key: 'Wire-Node-93:Node-130' },
    { key: 'Wire-Node-130:Node-131' },
    { key: 'Wire-Node-44:Node-131' },
    { key: 'Wire-Switch-114:Node-135' },
    { key: 'Wire-Node-135:Node-138' },
    { key: 'Wire-Node-8:Node-138' },
    { key: 'Wire-Switch-106:Node-143' },
    { key: 'Wire-Magnet-104:Cell-156' },
    { key: 'Wire-Switch-106:Cell-158' },
    { key: 'Wire-Switch-114:Cell-161' },
    { key: 'Wire-Magnet-113:Cell-160' },
    { key: 'Wire-Switch-68:Cell-169' },
    { key: 'Wire-Switch-42:Cell-173' },
    { key: 'Wire-Switch-3:Cell-172' },
    { key: 'Wire-Switch-59:Cell-171' },
    { key: 'Wire-Light-151:Cell-180' },
    { key: 'Wire-Light-150:Cell-179' },
    { key: 'Wire-Light-148:Cell-178' },
    { key: 'Wire-Light-149:Cell-177' },
    { key: 'Wire-Switch-46:Light-151' },
    { key: 'Wire-Switch-14:Light-150' },
    { key: 'Wire-Switch-72:Light-148' },
    { key: 'Wire-Switch-63:Light-149' },
    { key: 'Wire-Node-120:Node-189' },
    { key: 'Wire-Node-70:Node-189' },
    { key: 'Wire-Node-61:Node-135' },
    { key: 'Wire-Node-143:Node-194' },
    { key: 'Wire-Node-65:Node-194' },
    { key: 'Wire-Node-74:Node-194' },
  ],
}
