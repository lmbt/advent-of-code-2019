const intcodeInterpreter = (memory) => {

  // In an object so we can manipulate the value elsewhere
  let relativeBase = {
    value: 0
  }

  // Program loop
  for (let i = 0;;) {

    // Set the opcode (last 2 digits)
    let opcode = parseInt(memory[i].toString().split('').slice(-2).join(''))

    // Set the modes (other digits, reversed)
    let [
      first = 0,
      second = 0,
      third = 0
    ] = memory[i].toString().split('').reverse().slice(2).map(num => parseInt(num))

    // Explode if invalid opcode
    if (!operations[opcode]) {
      throw(`Unknown operation ${opcode}`)
    }

    // Special opcode handling
    // Exit if done
    if (opcode === 99) {
      return memory
    }

    // Perform operation
    let step = operations[opcode]({
      modes: {
        first,
        second,
        third
      },
      index: i,
      relativeBase,
      memory
    })

    // Step forward in the index
    i = i + step
  }
}

const operations = {
  // Addition
  1: ({modes, index, memory, relativeBase}) => {
    let valFirst
    let valSecond
    let valThird
    switch (modes.first) {
      case 2:
        valFirst = memory[relativeBase.value + memory[index + 1]]
        break
      case 1:
        valFirst = memory[index + 1]
        break
      case 0:
        valFirst = memory[memory[index + 1]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    switch (modes.second) {
      case 2:
        valSecond = memory[relativeBase.value + memory[index + 2]]
        break
      case 1:
        valSecond = memory[index + 2]
        break
      case 0:
        valSecond = memory[memory[index + 2]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    switch (modes.third) {
      case 2:
        valThird = relativeBase.value + memory[index + 3]
        break
      case 1:
        console.error(`Bad mode for insert: ${modes.third}. Defaulting to position mode.`)
        valThird = memory[index + 3]
        break
      case 0:
        valThird = memory[index + 3]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    // Day 9 - If accessing a num outside of assigned memory, default it to 0.
    valFirst = valFirst !== undefined
      ? valFirst
      : 0
    valSecond = valSecond !== undefined
      ? valSecond
      : 0
    valThird = valThird !== undefined
      ? valThird
      : 0
    memory[valThird] = valFirst + valSecond
    return 4
  },
  // Multiplication
  2: ({modes, index, memory, relativeBase}) => {
    let valFirst
    let valSecond
    let valThird
    switch (modes.first) {
      case 2:
        valFirst = memory[relativeBase.value + memory[index + 1]]
        break
      case 1:
        valFirst = memory[index + 1]
        break
      case 0:
        valFirst = memory[memory[index + 1]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    switch (modes.second) {
      case 2:
        valSecond = memory[relativeBase.value + memory[index + 2]]
        break
      case 1:
        valSecond = memory[index + 2]
        break
      case 0:
        valSecond = memory[memory[index + 2]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    switch (modes.third) {
      case 2:
        valThird = relativeBase.value + memory[index + 3]
        break
      case 1:
        console.error(`Bad mode for insert: ${modes.third}. Defaulting to position mode.`)
        valThird = memory[index + 3]
        break
      case 0:
        valThird = memory[index + 3]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    // Day 9 - If accessing a num outside of assigned memory, default it to 0.
    valFirst = valFirst !== undefined
      ? valFirst
      : 0
    valSecond = valSecond !== undefined
      ? valSecond
      : 0
    valThird = valThird !== undefined
      ? valThird
      : 0
    memory[valThird] = valFirst * valSecond
    return 4
  },
  // Insert
  3: ({modes, index, memory, relativeBase}) => {
    let valFirst
    switch (modes.first) {
      case 2:
        valFirst = relativeBase.value + memory[index + 1]
        break
      case 1:
        console.error(`Bad mode for insert: ${modes.first}. Defaulting to position mode.`)
        valFirst = memory[index + 1]
        break
      case 0:
        valFirst = memory[index + 1]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    // Day 9 - If accessing a num outside of assigned memory, default it to 0.
    valFirst = valFirst !== undefined
      ? valFirst
      : 0
    memory[valFirst] = parseInt(prompt())
    return 2
  },
  // Retrieve
  4: ({modes, index, memory, relativeBase}) => {
    let valFirst
    switch (modes.first) {
      case 2:
        valFirst = memory[relativeBase.value + memory[index + 1]]
        break
      case 1:
        valFirst = memory[index + 1]
        break
      case 0:
        valFirst = memory[memory[index + 1]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    // Day 9 - If accessing a num outside of assigned memory, default it to 0.
    valFirst = valFirst !== undefined
      ? valFirst
      : 0
    console.log(`OUTPUT: ${valFirst}`)
    return 2
  },
  // Jump-if-true
  5: ({modes, index, memory, relativeBase}) => {
    let valFirst
    let valSecond
    switch (modes.first) {
      case 2:
        valFirst = memory[relativeBase.value + memory[index + 1]]
        break
      case 1:
        valFirst = memory[index + 1]
        break
      case 0:
        valFirst = memory[memory[index + 1]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    switch (modes.second) {
      case 2:
        valSecond = memory[relativeBase.value + memory[index + 2]]
        break
      case 1:
        valSecond = memory[index + 2]
        break
      case 0:
        valSecond = memory[memory[index + 2]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    // Day 9 - If accessing a num outside of assigned memory, default it to 0.
    valFirst = valFirst !== undefined
      ? valFirst
      : 0
    valSecond = valSecond !== undefined
      ? valSecond
      : 0
    return valFirst !== 0
      ? valSecond - index
      : 3
  },
  // Jump-if-false
  6: ({modes, index, memory, relativeBase}) => {
    let valFirst
    let valSecond
    switch (modes.first) {
      case 2:
        valFirst = memory[relativeBase.value + memory[index + 1]]
        break
      case 1:
        valFirst = memory[index + 1]
        break
      case 0:
        valFirst = memory[memory[index + 1]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    switch (modes.second) {
      case 2:
        valSecond = memory[relativeBase.value + memory[index + 2]]
        break
      case 1:
        valSecond = memory[index + 2]
        break
      case 0:
        valSecond = memory[memory[index + 2]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    // Day 9 - If accessing a num outside of assigned memory, default it to 0.
    valFirst = valFirst !== undefined
      ? valFirst
      : 0
    valSecond = valSecond !== undefined
      ? valSecond
      : 0
    return valFirst === 0
      ? valSecond - index
      : 3
  },
  // Less than
  7: ({modes, index, memory, relativeBase}) => {
    let valFirst
    let valSecond
    let valThird
    switch (modes.first) {
      case 2:
        valFirst = memory[relativeBase.value + memory[index + 1]]
        break
      case 1:
        valFirst = memory[index + 1]
        break
      case 0:
        valFirst = memory[memory[index + 1]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    switch (modes.second) {
      case 2:
        valSecond = memory[relativeBase.value + memory[index + 2]]
        break
      case 1:
        valSecond = memory[index + 2]
        break
      case 0:
        valSecond = memory[memory[index + 2]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    switch (modes.third) {
      case 2:
        valThird = relativeBase.value + memory[index + 3]
        break
      case 1:
        console.error(`Bad mode for insert: ${modes.third}. Defaulting to position mode.`)
        valThird = memory[index + 3]
        break
      case 0:
        valThird = memory[index + 3]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    // Day 9 - If accessing a num outside of assigned memory, default it to 0.
    valFirst = valFirst !== undefined
      ? valFirst
      : 0
    valSecond = valSecond !== undefined
      ? valSecond
      : 0
    valThird = valThird !== undefined
      ? valThird
      : 0
    memory[valThird] = valFirst < valSecond
      ? 1
      : 0
    return 4
  },
  // Equals
  8: ({modes, index, memory, relativeBase}) => {
    let valFirst
    let valSecond
    let valThird
    switch (modes.first) {
      case 2:
        valFirst = memory[relativeBase.value + memory[index + 1]]
        break
      case 1:
        valFirst = memory[index + 1]
        break
      case 0:
        valFirst = memory[memory[index + 1]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    switch (modes.second) {
      case 2:
        valSecond = memory[relativeBase.value + memory[index + 2]]
        break
      case 1:
        valSecond = memory[index + 2]
        break
      case 0:
        valSecond = memory[memory[index + 2]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    switch (modes.third) {
      case 2:
        valThird = relativeBase.value + memory[index + 3]
        break
      case 1:
        console.error(`Bad mode for insert: ${modes.third}. Defaulting to position mode.`)
        valThird = memory[index + 3]
        break
      case 0:
        valThird = memory[index + 3]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    // Day 9 - If accessing a num outside of assigned memory, default it to 0.
    valFirst = valFirst !== undefined
      ? valFirst
      : 0
    valSecond = valSecond !== undefined
      ? valSecond
      : 0
    valThird = valThird !== undefined
      ? valThird
      : 0
    memory[valThird] = valFirst === valSecond
      ? 1
      : 0
    return 4
  },
  // Increase relative base
  9: ({modes, index, memory, relativeBase}) => {
    let valFirst
    switch (modes.first) {
      case 2:
        valFirst = memory[relativeBase.value + memory[index + 1]]
        break
      case 1:
        valFirst = memory[index + 1]
        break
      case 0:
        valFirst = memory[memory[index + 1]]
        break
      default:
        console.error(`Unknown mode: ${modes.first}`)
        break
    }
    // Day 9 - If accessing a num outside of assigned memory, default it to 0.
    valFirst = valFirst !== undefined
      ? valFirst
      : 0
    relativeBase.value = relativeBase.value + valFirst
    return 2
  },
  99: () => {
    return 'done'
  }
}

let tests = [
  {name:"additionImmediate",value: intcodeInterpreter('1101,2,3,5,99,0'.split(',').map(num => parseInt(num))).toString() === '1101,2,3,5,99,5'},
  {name:"additionPosition",value: intcodeInterpreter('1,2,3,5,99,0'.split(',').map(num => parseInt(num))).toString() === '1,2,3,5,99,8'},
  {name:"additionRelative",value: intcodeInterpreter('209,4,2201,1,3,7,99,0'.split(',').map(num => parseInt(num))).toString() === '209,4,2201,1,3,7,99,102'},
  {name:"multiplicationImmediate",value: intcodeInterpreter('1102,2,3,5,99,0'.split(',').map(num => parseInt(num))).toString() === '1102,2,3,5,99,6'},
  {name:"multiplicationPosition",value: intcodeInterpreter('2,2,3,5,99,0'.split(',').map(num => parseInt(num))).toString() === '2,2,3,5,99,15'},
  {name:"multiplicationRelative",value: intcodeInterpreter('209,4,2202,1,3,7,99,0'.split(',').map(num => parseInt(num))).toString() === '209,4,2202,1,3,7,99,297'},
  //{name:"insertImmediate",value: intcodeInterpreter('103,1,99'.split(',').map(num => parseInt(num))).toString() === '103,1234,99'},
  //{name:"insertPosition",value: intcodeInterpreter('3,1,99'.split(',').map(num => parseInt(num))).toString() === '3,1234,99'},
  //{name:"insertRelative",value: intcodeInterpreter('209,3,203,1,99'.split(',').map(num => parseInt(num))).toString() === '209,3,1234,1,99'},
  {name:"retrieveImmediate",value: intcodeInterpreter('104,0,99'.split(',').map(num => parseInt(num))).toString() === '104,0,99'},
  {name:"retrievePosition",value: intcodeInterpreter('4,0,99'.split(',').map(num => parseInt(num))).toString() === '4,0,99'},
  {name:"retrieveRelative",value: intcodeInterpreter('209,3,204,1,99'.split(',').map(num => parseInt(num))).toString() === '209,3,204,1,99'},
  {name:"jumpIfTrueImmediate",value: intcodeInterpreter('1105,1,3,99'.split(',').map(num => parseInt(num))).toString() === '1105,1,3,99'},
  {name:"jumpIfTruePosition",value: intcodeInterpreter('5,1,3,4,99'.split(',').map(num => parseInt(num))).toString() === '5,1,3,4,99'},
  {name:"jumpIfTrueRelative",value: intcodeInterpreter('209,3,2205,3,4,99,1,5'.split(',').map(num => parseInt(num))).toString() === '209,3,2205,3,4,99,1,5'},
  {name:"jumpIfFalseImmediate",value: intcodeInterpreter('1105,0,3,99'.split(',').map(num => parseInt(num))).toString() === '1105,0,3,99'},
  {name:"jumpIfFalsePosition",value: intcodeInterpreter('6,4,5,99,0,3'.split(',').map(num => parseInt(num))).toString() === '6,4,5,99,0,3'},
  {name:"jumpIfFalseRelative",value: intcodeInterpreter('209,3,2206,3,4,99,0,5'.split(',').map(num => parseInt(num))).toString() === '209,3,2206,3,4,99,0,5'},
  {name:"lessThanImmediate",value: intcodeInterpreter('11107,0,1,3,99'.split(',').map(num => parseInt(num))).toString() === '11107,0,1,1,99'},
  {name:"lessThanPosition",value: intcodeInterpreter('7,1,0,3,99'.split(',').map(num => parseInt(num))).toString() === '7,1,0,1,99'},
  {name:"lessThanRelative",value: intcodeInterpreter('109,2,2207,1,2,3,99'.split(',').map(num => parseInt(num))).toString() === '109,2,2207,1,2,3,99'},
  {name:"equalsImmediate",value: intcodeInterpreter('11108,1,1,3,99'.split(',').map(num => parseInt(num))).toString() === '11108,1,1,1,99'},
  {name:"equalsPosition",value: intcodeInterpreter('8,1,1,3,99'.split(',').map(num => parseInt(num))).toString() === '8,1,1,1,99'},
  {name:"equalsRelative",value: intcodeInterpreter('109,2,2208,1,1,3,99'.split(',').map(num => parseInt(num))).toString() === '109,2,2208,1,1,3,99'},
  {name:"relativeBaseImmediate",value: intcodeInterpreter('109,22,99'.split(',').map(num => parseInt(num))).toString() === '109,22,99'},
  {name:"relativeBasePosition",value: intcodeInterpreter('9,2,99'.split(',').map(num => parseInt(num))).toString() === '9,2,99'},
  {name:"relativeBaseRelative",value: intcodeInterpreter('109,1,209,0,99'.split(',').map(num => parseInt(num))).toString() === '109,1,209,0,99'}
]

if (tests.every(test => test.value === true)){
  // Input 2 instead of 1 this time.
  intcodeInterpreter('1102,34463338,34463338,63,1007,63,34463338,63,1005,63,53,1102,1,3,1000,109,988,209,12,9,1000,209,6,209,3,203,0,1008,1000,1,63,1005,63,65,1008,1000,2,63,1005,63,904,1008,1000,0,63,1005,63,58,4,25,104,0,99,4,0,104,0,99,4,17,104,0,99,0,0,1102,31,1,1009,1101,35,0,1006,1102,1,23,1002,1101,0,32,1013,1101,0,37,1003,1101,0,620,1029,1101,0,28,1011,1102,22,1,1016,1102,1,0,1020,1102,1,34,1007,1102,1,417,1026,1102,1,25,1000,1101,27,0,1010,1102,580,1,1025,1102,1,629,1028,1101,20,0,1004,1102,899,1,1022,1101,26,0,1001,1102,410,1,1027,1102,39,1,1018,1101,0,30,1008,1101,0,38,1014,1101,1,0,1021,1102,29,1,1017,1101,0,36,1012,1101,585,0,1024,1101,0,21,1005,1101,0,892,1023,1102,1,33,1019,1101,24,0,1015,109,17,1206,3,195,4,187,1105,1,199,1001,64,1,64,1002,64,2,64,109,-7,2108,30,-2,63,1005,63,217,4,205,1105,1,221,1001,64,1,64,1002,64,2,64,109,6,1206,5,233,1106,0,239,4,227,1001,64,1,64,1002,64,2,64,109,-16,1202,9,1,63,1008,63,34,63,1005,63,259,1105,1,265,4,245,1001,64,1,64,1002,64,2,64,109,8,1207,-2,34,63,1005,63,285,1001,64,1,64,1105,1,287,4,271,1002,64,2,64,109,-4,1207,-3,27,63,1005,63,305,4,293,1105,1,309,1001,64,1,64,1002,64,2,64,109,-1,21107,40,41,9,1005,1012,331,4,315,1001,64,1,64,1105,1,331,1002,64,2,64,109,5,2107,19,-4,63,1005,63,349,4,337,1106,0,353,1001,64,1,64,1002,64,2,64,109,1,1208,-5,20,63,1005,63,371,4,359,1105,1,375,1001,64,1,64,1002,64,2,64,109,-2,21101,41,0,9,1008,1016,41,63,1005,63,397,4,381,1106,0,401,1001,64,1,64,1002,64,2,64,109,25,2106,0,-5,1001,64,1,64,1105,1,419,4,407,1002,64,2,64,109,-30,2102,1,0,63,1008,63,26,63,1005,63,439,1106,0,445,4,425,1001,64,1,64,1002,64,2,64,109,2,2108,32,4,63,1005,63,465,1001,64,1,64,1105,1,467,4,451,1002,64,2,64,109,-11,1201,10,0,63,1008,63,34,63,1005,63,491,1001,64,1,64,1106,0,493,4,473,1002,64,2,64,109,27,21102,42,1,-1,1008,1019,42,63,1005,63,515,4,499,1105,1,519,1001,64,1,64,1002,64,2,64,109,-6,1201,-7,0,63,1008,63,34,63,1005,63,545,4,525,1001,64,1,64,1106,0,545,1002,64,2,64,109,-15,1202,3,1,63,1008,63,23,63,1005,63,567,4,551,1105,1,571,1001,64,1,64,1002,64,2,64,109,33,2105,1,-8,4,577,1106,0,589,1001,64,1,64,1002,64,2,64,109,-19,1208,-4,34,63,1005,63,605,1105,1,611,4,595,1001,64,1,64,1002,64,2,64,109,7,2106,0,8,4,617,1001,64,1,64,1106,0,629,1002,64,2,64,109,-8,1205,9,647,4,635,1001,64,1,64,1106,0,647,1002,64,2,64,109,-12,2107,38,3,63,1005,63,667,1001,64,1,64,1106,0,669,4,653,1002,64,2,64,109,-3,2102,1,10,63,1008,63,34,63,1005,63,695,4,675,1001,64,1,64,1105,1,695,1002,64,2,64,109,14,21108,43,45,4,1005,1015,711,1105,1,717,4,701,1001,64,1,64,1002,64,2,64,109,13,1205,-4,733,1001,64,1,64,1105,1,735,4,723,1002,64,2,64,109,-30,2101,0,9,63,1008,63,37,63,1005,63,761,4,741,1001,64,1,64,1106,0,761,1002,64,2,64,109,17,21102,44,1,1,1008,1012,45,63,1005,63,785,1001,64,1,64,1106,0,787,4,767,1002,64,2,64,109,5,2101,0,-9,63,1008,63,35,63,1005,63,811,1001,64,1,64,1106,0,813,4,793,1002,64,2,64,109,2,21107,45,44,-5,1005,1013,833,1001,64,1,64,1106,0,835,4,819,1002,64,2,64,109,-2,21101,46,0,-6,1008,1010,44,63,1005,63,855,1106,0,861,4,841,1001,64,1,64,1002,64,2,64,109,2,21108,47,47,-8,1005,1010,883,4,867,1001,64,1,64,1106,0,883,1002,64,2,64,109,2,2105,1,3,1001,64,1,64,1106,0,901,4,889,4,64,99,21102,27,1,1,21102,1,915,0,1105,1,922,21201,1,28815,1,204,1,99,109,3,1207,-2,3,63,1005,63,964,21201,-2,-1,1,21102,1,942,0,1105,1,922,21202,1,1,-1,21201,-2,-3,1,21101,0,957,0,1105,1,922,22201,1,-1,-2,1106,0,968,21202,-2,1,-2,109,-3,2106,0,0'.split(',').map(num => parseInt(num)))
} else {
  console.error(`TESTS FAILED`)
  console.error(tests.filter(test => {
    test.value === false
  }))
}
