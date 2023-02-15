interface iobjWithAmount{
  id: string,
  amount: number,
}
interface iobj {
  id: string,
  name?: string,
  code?: string,
  title?: string
}
interface item{
  id: string,
  amount: number,
  targetEag: iobj,
  targetObject: iobj,
  // targetObjectCostCenter: iobj,
  targetObjectTypeObject: iobj,
  // expenseData: iobjWithAmount,
  expenseDataId: string,
  allocatedResultSource: {
    id: string,
    amount: number,
    sourceCostCenter: iobj,
    sourcePerson?: iobj,
    sourceProject?: iobj,
    sourceObjectTypeObject: iobj,
    srcObjectId: string

    sourceEag: iobj
  }
}
export const data:item[] = [
    {
      "allocatedResultSource": {
        "id": "resource001",
        "amount": 100,
        "sourceCostCenter": {
          "id": "cc3",
          "name": "成本中心cc3"
        },
        "sourceObjectTypeObject": {
          "id": "CostCenter",
          "title": "成本中心"
        },
        // "srcObject": {
        //   "id": "ed1" //expenseData
        // },
        "srcObjectId": "ex1",
        "sourceEag": {
          "id": "001z",
          "name": "外包"
        }
      },
      "amount": 80,
      // "expenseData": {
      //   "id": "ed3",
      //   "amount": 100
      // },
      "expenseDataId": "ex1",
      "id": "t1",
      "targetEag": {
        "id": "001z",
        "name": "外包"
      },
      "targetObject": {
        "id": "cc1",
        "name": "成本中心cc1"
      },
      "targetObjectTypeObject": {
        "id": "CostCenter",
        "title": "成本中心"
      }
    },
    {
      "allocatedResultSource": {
        "id": "resource001",
        "amount": 100,
        "sourceCostCenter": {
          "id": "cc3",
          "name": "成本中心cc3"
        },
        "sourceObjectTypeObject": {
          "id": "CostCenter",
          "title": "成本中心"
        },
        "sourceEag": {
          "id": "001z",
          "name": "外包"
        },
        // "srcObject": {
        //   "id": "ed1" //expenseData
        // },
        "srcObjectId": "ex1"
      },
      "amount": 20,
      // "expenseData": {
      //   "id": "ed3",
      //   "amount": 100
      // },
      "expenseDataId": "ex1",
      "id": "t2",
      "targetEag": {
        "id": "001z",
        "name": "外包"
      },
      "targetObject": {
        "id": "cc2",
        "name": "成本中心cc2"
      },
      "targetObjectTypeObject": {
        "id": "CostCenter",
        "title": "成本中心"
      }
    },
    {
      "allocatedResultSource": {
        "id": "resource002",
        "amount": 300,
        "sourceCostCenter": {
          "id": "cc3",
          "name": "成本中心cc3"
        },
        "sourceObjectTypeObject": {
          "id": "CostCenter",
          "title": "成本中心"
        },
        "sourceEag": {
          "id": "001z",
          "name": "正式"
        },
        // "srcObject": {
        //   "id": "ed1" //expenseData
        // },
        "srcObjectId": "ex3"
      },
      "amount": 240,
      // "expenseData": {
      //   "id": "ed31",
      //   "amount": 300
      // },
      "expenseDataId": "ex3",
      "id": "t3",
      "targetEag": {
        "id": "001z",
        "name": "正式"
      },
      "targetObject": {
        "id": "cc1",
        "name": "成本中心cc1"
      },
      "targetObjectTypeObject": {
        "id": "CostCenter",
        "title": "成本中心"
      }
    },
    {
      "allocatedResultSource": {
        "id": "resource002",
        "amount": 300,
        "sourceCostCenter": {
          "id": "cc3",
          "name": "成本中心cc3"
        },
        "sourceObjectTypeObject": {
          "id": "CostCenter",
          "title": "成本中心"
        },
        "sourceEag": {
          "id": "001z",
          "name": "正式"
        },
        // "srcObject": {
        //   "id": "ed1" //expenseData
        // },
        "srcObjectId": "ex3"
      },
      "amount": 60,
      // "expenseData": {
      //   "id": "ed31",
      //   "amount": 300
      // },
      "expenseDataId": "ex3",
      "id": "t4",
      "targetEag": {
        "id": "001z",
        "name": "正式"
      },
      "targetObject": {
        "id": "cc2",
        "name": "成本中心cc2"
      },
      "targetObjectTypeObject": {
        "id": "CostCenter",
        "title": "成本中心"
      }
    },
    {
      "allocatedResultSource": {
        "id": "resource003",
        "amount": 80,
        "sourceCostCenter": {
          "id": "cc1",
          "name": "成本中心cc1"
        },
        "sourceObjectTypeObject": {
          "id": "CostCenter",
          "title": "成本中心"
        },
        "sourceEag": {
          "id": "001z",
          "name": "外包"
        },
        // "srcObject": {
        //   "id": "ed1" //expenseData
        // },
        "srcObjectId": "t1"
      },
      "amount": 20,
      // "expenseData": {
      //   "id": "ed3",
      //   "amount": 100
      // },
      "expenseDataId": "ex1",
      "id": "t5",
      "targetEag": {
        "id": "001z",
        "name": "外包"
      },
      "targetObject": {
        "id": "p1",
        "name": "人员p1"
      },
      "targetObjectTypeObject": {
        "id": "User",
        "title": "人员"
      }
    },
    {
      "allocatedResultSource": {
        "id": "resource003",
        "amount": 80,
        "sourceCostCenter": {
          "id": "cc1",
          "name": "成本中心cc1"
        },
        "sourceObjectTypeObject": {
          "id": "CostCenter",
          "title": "成本中心"
        },
        "sourceEag": {
          "id": "001z",
          "name": "外包"
        },
        // "srcObject": {
        //   "id": "ed1" //expenseData
        // },
        "srcObjectId": "t1"
      },
      "amount": 60,
      // "expenseData": {
      //   "id": "ed3",
      //   "amount": 100
      // },
      "expenseDataId": "ex1",
      "id": "t6",
      "targetEag": {
        "id": "001z",
        "name": "外包"
      },
      "targetObject": {
        "id": "p2",
        "name": "人员p2"
      },
      "targetObjectTypeObject": {
        "id": "User",
        "title": "人员"
      }
    },
    {
      "allocatedResultSource": {
        "id": "resource004",
        "amount": 240,
        "sourceCostCenter": {
          "id": "cc1",
          "name": "成本中心cc1"
        },
        "sourceObjectTypeObject": {
          "id": "CostCenter",
          "title": "成本中心"
        },
        "sourceEag": {
          "id": "001z",
          "name": "正式"
        },
        // "srcObject": {
        //   "id": "ed1" //expenseData
        // },
        "srcObjectId": "t3"
      },
      "amount": 60,
      // "expenseData": {
      //   "id": "ed31",
      //   "amount": 300
      // },
      "expenseDataId": "ex3",
      "id": "t7",
      "targetEag": {
        "id": "001z",
          "name": "正式"
      },
      "targetObject": {
        "id": "p1",
        "name": "人员p1"
      },
      "targetObjectTypeObject": {
        "id": "User",
        "title": "人员"
      }
    },
    {
      "allocatedResultSource": {
        "id": "resource004",
        "amount": 240,
        "sourceCostCenter": {
          "id": "cc1",
          "name": "成本中心cc1"
        },
        "sourceObjectTypeObject": {
          "id": "CostCenter",
          "title": "成本中心"
        },
        "sourceEag": {
          "id": "001z",
          "name": "正式"
        },
        // "srcObject": {
        //   "id": "ed1" //expenseData
        // },
        "srcObjectId": "t3"
      },
      "amount": 180,
      // "expenseData": {
      //   "id": "ed31",
      //   "amount": 300
      // },
      "expenseDataId": "ex3",
      "id": "t8",
      "targetEag": {
        "id": "001z",
          "name": "正式"
      },
      "targetObject": {
        "id": "p2",
        "name": "人员p2"
      },
      "targetObjectTypeObject": {
        "id": "User",
        "title": "人员"
      }
    },
    {
      "allocatedResultSource": {
        "id": "resource005",
        "amount": 200,
        "sourceCostCenter": {
          "id": "cc1",
          "name": "成本中心cc1"
        },
        "sourceObjectTypeObject": {
          "id": "CostCenter",
          "title": "成本中心"
        },
        "sourceEag": {
          "id": "001z",
          "name": "正式"
        },
        // "srcObject": {
        //   "id": "ed1" //expenseData
        // },
        "srcObjectId": "ex2"
      },
      "amount": 50,
      // "expenseData": {
      //   "id": "ed1",
      //   "amount": 200
      // },
      "expenseDataId": "ex2",
      "id": "t9",
      "targetEag": {
        "id": "001z",
          "name": "正式"
      },
      "targetObject": {
        "id": "p1",
        "name": "人员p1"
      },
      "targetObjectTypeObject": {
        "id": "User",
        "title": "人员"
      }
    },
    {
      "allocatedResultSource": {
        "id": "resource005",
        "amount": 200,
        "sourceCostCenter": {
          "id": "cc1",
          "name": "成本中心cc1"
        },
        "sourceObjectTypeObject": {
          "id": "CostCenter",
          "title": "成本中心"
        },
        "sourceEag": {
          "id": "001z",
          "name": "正式"
        },
        // "srcObject": {
        //   "id": "ed1" //expenseData
        // },
        "srcObjectId": "ex2"
      },
      "amount": 150,
      // "expenseData": {
      //   "id": "ed1",
      //   "amount": 200
      // },
      "expenseDataId": "ex2",
      "id": "t10",
      "targetEag": {
        "id": "001z",
          "name": "正式"
      },
      "targetObject": {
        "id": "p2",
        "name": "人员p2"
      },
      "targetObjectTypeObject": {
        "id": "User",
        "title": "人员"
      }
    },
  ]