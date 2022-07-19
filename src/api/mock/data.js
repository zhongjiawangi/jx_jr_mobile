import cityJson from "@/utils/jsCity";
let typeList = [
  {
    name: "房建市政",
    value: "1",
  },
  {
    name: "水利工程",
    value: "2",
  },
  {
    name: "交通工程",
    value: "3",
  },
  {
    name: "政府采购",
    value: "4",
  },
  {
    name: "其他类型",
    value: "5",
  },
];
let statusList = [
  {
    name: "公告中",
    value: "announcement",
  },
  {
    name: "待开标",
    value: "pending",
  },
  {
    name: "已中标",
    value: "winBidder",
  },
  {
    name: "未中标",
    value: "unBidder",
  },
  {
    name: "延期",
    value: "postponed",
  },
  {
    name: "流标",
    value: "streamLabels",
  },
];
let CITY = cityJson[0].children;

function findCity(value) {
  return CITY.find(
    (item) => String(item.value).slice(0, 4) == String(value).slice(0, 4)
  ).children.find((item) => item.value == value).label;
}
//用户信息
export function userinfo() {
  return {
    message: "success",
    status: 200,
    "data|10": [
      {
        userid: "@id()",
        username: "@cname()",
        date: "@date()",
        avatar: "@image('200x200','red','#fff','avatar')",
        description: "@paragraph()",
        ip: "@ip()",
        email: "@email()",
      },
    ],
  };
}
//项目列表
export function projectList(data = {}) {
  console.log(data);
  const type =
    data.type > 0
      ? [typeList.find((item) => item.value == data.type)]
      : typeList;
  const status =
    data.status == "all"
      ? statusList
      : [statusList.find((item) => item.value == data.status)];
  const city = data.city ? findCity(data.city) : "@city()";
  const projectName = data.keyword || "@csentence(8)";
  let json = {
    message: "success",
    status: 200,
    "data|15": [
      {
        id: "@id()",
        "type|1": type,
        // area: "@city()",
        area: city,
        "status|1": status,
        publicationTime: "@datetime()",
        tenderTime: "@datetime()",
        projectName: projectName,
        "aptitude|1": ["一级以上", "二级以上", "三级以上"],
        "builderLevel|1-3": 1,
        "censorType|1": ["方式一", "方式二", "方式三"],
        "investment|100000-10000000": 1,
        biddingUnits: "@ctitle(5, 10)",
      },
    ],
  };
  return json;
}
//项目信息
export function projectInfo() {
  return {
    message: "success",
    status: 200,
    data: [
      {
        id: "@id()",
        publicationTime: "@datetime()",
        projectName: "@csentence(8)",
        area: "@city()",
        "type|1": [
          {
            name: "房建市政",
            value: "1",
          },
          {
            name: "水利工程",
            value: "2",
          },
          {
            name: "交通工程",
            value: "3",
          },
          {
            name: "政府采购",
            value: "4",
          },
          {
            name: "其他类型",
            value: "5",
          },
        ],
        notice: {
          text: "招标公告",
          unitName: "@ctitle(8)",
          "investment|100000-10000000": 1,
          "reviewMethod|1": ["方式一", "方式二", "方式三"],
          "aptitude|1": ["一级以上", "二级以上", "三级以上"],
          "builderLevel|1-3": 1,
          "fundNeed|30-100": 1,
          "bidNum|1-4": 1,
          agent: "@ctitle(5, 10)",
          "telephone|+10": "15083970000",
          "controlPrice|10000-800000": 1,
          "earnestMoney|10000-800000": 1,
          "duration|180-365": 1,
          downloadDeadline: "@datetime()",
          otherRequirements: "@csentence()",
        },
        openInfo: {
          text: "开标信息",
          openTime: "@datetime()",
          openAddress: "@county(true)",
        },
        candidate: {
          text: "中标候选人公示",
          "list|1": ["张三", "李四", "王五", "赵六", "钱七", "孙八"],
        },
        bidResult: {
          text: "中标结果公示",
          bidWinnerName: "@ctitle(5, 10)",
        },
      },
    ],
  };
}

//通知列表
export function noticeList() {
  return {
    message: "success",
    status: 200,
    "data|5-10": [
      {
        id: "@id()",
        title: "@ctitle(15, 30)",
        time: "@datetime()",
        contant: "@cparagraph()",
      },
    ],
  };
}
//通知信息
export function noticeInfo() {
  return {
    message: "success",
    status: 200,
    data: {
      id: "@id()",
      title: "@ctitle(8, 15)",
      time: "@datetime()",
      contant: "@cparagraph()",
    },
  };
}
