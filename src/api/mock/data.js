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
export function projectList() {
  return {
    message: "success",
    status: 200,
    "data|15": [
      {
        id: "@id()",
        'type|1': [
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
        area: "@city()",
        "status|1": [
          {
            name: "全部",
            value: "all",
          },
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
        ],
        publicationTime: "@datetime()",
        tenderTime: "@datetime()",
        projectName: "@csentence(8)",
        "aptitude|1": ["一级以上", "二级以上", "三级以上"],
        "builderLevel|1-3": 1,
        "censorType|1": ["方式一", "方式二", "方式三"],
        "investment|100000-10000000": 1,
        biddingUnits: "@ctitle(5, 10)",
      },
    ],
  };
}
export function projectInfo() {
  return {
    message: "success",
    status: 200,
    data: [
      {
        notice: {
          text: "招标公告",
          children: {
            unitName: "@csentence(8)",
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
        },
        openInfo: {
          text: "开标信息",
          children: {
            openTime: "@datetime()",
            openAddress: "@county(true)",
          },
        },
        candidate: {
          text: "中标候选人公示",
          "children|2": ["张三", "李四", "王五", "赵六", "钱七", "孙八"],
        },
        bidResult: {
          text: "中标结果公示",
          children: {
            bidWinnerName: "@ctitle(5, 10)",
          },
        },
      },
    ],
  };
}
export const obj = {
  id: "@natural()",
  notice: {
    text: "招标公告",
    children: {
      unitName: "@csentence(8)",
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
  },
  openInfo: {
    text: "开标信息",
    children: {
      openTime: "@datetime()",
      openAddress: "@county(true)",
    },
  },
  candidate: {
    text: "中标候选人公示",
    "children|2": ["张三", "李四", "王五", "赵六", "钱七", "孙八"],
  },
  bidResult: {
    text: "中标结果公示",
    children: {
      bidWinnerName: "@ctitle(5, 10)",
    },
  },
};
