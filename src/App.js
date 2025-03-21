// ========== [Part 1 시작] ==========

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Heart,
  ChevronLeft,
  Scale,
  Home,
  DollarSign,
  FileText,
  Ticket,
  MessageSquare,
  HelpCircle,
  Activity,
  LogIn,
  LogOut,
  User,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

/* 
  1) 화면(컴포넌트)들을 먼저 모두 정의합니다.
     2) 마지막에 LegalInsightsApp() 함수에서
        switch문을 통해 화면을 전환합니다.
*/

// ======================== 화면에 표시될 데이터 ========================

const casesData = {
  "2025-03-22": [
    {
      id: 1,
      title: "OO 사건 오전 공판",
      time: "10:00",
      court: "서울중앙지법 1호",
      judge: "김민수 부장판사",
      overview:
        "2024년 서울에서 발생한 OO초등생 관련 사건으로, 피고인은 피해자를 유인해 살해한 후 유기한 혐의로 기소되었습니다.",
      timeline: [
        "1차 공판 - 2025-01-15 (피고인 혐의 인정 여부)",
        "2차 공판 - 2025-02-18 (증인 신문 진행)",
        "3차 공판 예정 - 2025-03-22 (최후 변론 및 구형)",
      ],
      relatedNews: [
        {
          name: "SBS 단독 보도 - ‘OO초등생 사건’ 피고인 법정에서 울먹여",
          url: "https://news.sbs.co.kr/",
        },
        {
          name: "JTBC - 피해자 부모 측 ‘엄벌 요구’",
          url: "https://news.jtbc.co.kr/",
        },
      ],
    },
    {
      id: 2,
      title: "OO 사건 오후 공판",
      time: "14:00",
      court: "서울중앙지법 3호",
      judge: "김민수 부장판사",
      overview:
        "오후 공판에서는 추가 증인 신문과 검찰 측 증거 서류 제출이 예정되어 있습니다.",
      timeline: [
        "1차 공판 - 2025-01-15 (피고인 혐의 인정 여부)",
        "2차 공판 - 2025-02-18 (증인 신문 진행)",
        "3차 공판 예정 - 2025-03-22 (추가 증인 및 최후 변론)",
      ],
      relatedNews: [
        {
          name: "SBS 단독 보도 - ‘OO초등생 사건’ 피고인 법정에서 울먹여",
          url: "https://news.sbs.co.kr/",
        },
        {
          name: "JTBC - 피해자 부모 측 ‘엄벌 요구’",
          url: "https://news.jtbc.co.kr/",
        },
      ],
    },
    {
      id: 3,
      title: "OO 사건 선고",
      time: "16:00",
      court: "서울중앙지법 5호",
      judge: "김민수 부장판사",
      overview:
        "마지막으로 선고가 예정되어 있습니다. 검찰은 무기징역을 구형할 것으로 보입니다.",
      timeline: [
        "1차 공판 - 2025-01-15",
        "2차 공판 - 2025-02-18",
        "선고 - 2025-03-22 (형량 결정)",
      ],
      relatedNews: [
        {
          name: "SBS 단독 보도 - ‘OO초등생 사건’ 피고인 법정에서 울먹여",
          url: "https://news.sbs.co.kr/",
        },
        {
          name: "JTBC - 피해자 부모 측 ‘엄벌 요구’",
          url: "https://news.jtbc.co.kr/",
        },
      ],
    },
  ],
  "2025-04-02": [
    {
      id: 4,
      title: "XX 사건 재판",
      time: "11:00",
      court: "서울중앙지법 2호",
      judge: "박영희 판사",
      overview:
        "피고인은 사기 혐의로 기소되었으며, 증인 2명이 출석할 예정입니다.",
      timeline: [
        "1차 공판 - 2025-03-05",
        "2차 공판 - 2025-03-20",
        "3차 공판 예정 - 2025-04-02",
      ],
      relatedNews: [
        {
          name: "KBS - XX 사건, 피고인 혐의 부인",
          url: "https://news.kbs.co.kr/",
        },
      ],
    },
  ],
  "2025-04-10": [
    {
      id: 5,
      title: "YY 사건 항소심",
      time: "09:30",
      court: "서울중앙지법 6호",
      judge: "이철수 부장판사",
      overview:
        "1심에서 징역 2년이 선고된 YY 사건이 항소심을 맞이했습니다. 양측 변호인단이 치열한 공방을 벌일 것으로 예상됩니다.",
      timeline: [
        "1심 판결 - 2025-02-10 (징역 2년 선고)",
        "항소심 1차 공판 - 2025-04-10 (변론 및 증거 제출)",
      ],
      relatedNews: [],
    },
    {
      id: 6,
      title: "YY 사건 항소심 오후",
      time: "14:00",
      court: "서울중앙지법 7호",
      judge: "이철수 부장판사",
      overview:
        "오후에 추가 증인 신문이 예정되어 있습니다. 변호인 측에서 새 증거를 제출할 가능성이 있습니다.",
      timeline: [
        "1심 판결 - 2025-02-10",
        "항소심 1차 공판 - 2025-04-10 (오후 증인 신문)",
      ],
      relatedNews: [],
    },
  ],
};

// (1) HeaderBar
function HeaderBar({ setScreen }) {
  return (
    <div className="flex justify-end bg-white px-4 py-2 border-b border-gray-300">
      <button
        className="text-gray-600 mx-2 hover:text-black"
        onClick={() => setScreen("login")}
      >
        <LogIn className="w-5 h-5" />
      </button>
      <button
        className="text-gray-600 mx-2 hover:text-black"
        onClick={() => setScreen("logout")}
      >
        <LogOut className="w-5 h-5" />
      </button>
      <button
        className="text-gray-600 mx-2 hover:text-black"
        onClick={() => setScreen("mypage")}
      >
        <User className="w-5 h-5" />
      </button>
      <button
        className="text-gray-600 mx-2 hover:text-black"
        onClick={() => setScreen("settings")}
      >
        <Settings className="w-5 h-5" />
      </button>
    </div>
  );
}

// (2) HomeScreen
function HomeScreen({
  onDetail,
  onSearch,
  caseDates,
  date,
  setDate,
  activeStartDate,
  setActiveStartDate,
  searchQuery,
  setSearchQuery,
  onDateSelected,
}) {
  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col items-center mt-4 space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <Scale className="w-10 h-10 text-[#001F3F]" />
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-2xl font-bold text-[#001F3F]"
          >
            Legal Insights
          </motion.h1>
        </div>
        <div className="w-full flex items-center space-x-2">
          <input
            type="text"
            placeholder="판례 검색 (예: OO 사건)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-300"
          />
          <Button
            className="rounded-lg px-4 py-2 bg-[#001F3F] text-white hover:bg-gray-500"
            onClick={onSearch}
          >
            검색
          </Button>
        </div>
      </div>

      <Card className="rounded-2xl shadow p-4 bg-[#FAFAFA]">
        <CardContent>
          <h2 className="text-xl font-semibold text-black">
            서울중앙지법, OO 사건 판결 발표
          </h2>
          <p className="text-sm text-gray-600 mt-1">2025-03-21 / 법률 뉴스</p>
          <p className="text-sm text-gray-800 mt-2">
            최근 서울중앙지법에서 발표된 OO 사건 판결 소식입니다. 이번 판결은
            법률 전문가들 사이에서 큰 주목을 받고 있습니다.
          </p>
          <Button
            className="rounded-2xl mt-4 w-full bg-[#001F3F] text-white hover:bg-gray-500"
            onClick={onDetail}
          >
            상세보기
          </Button>
        </CardContent>
      </Card>

      <Card className="rounded-lg shadow p-4 bg-[#FAFAFA] border border-gray-300 text-center">
        <CardContent>
          <h2 className="text-lg font-semibold text-black mb-4">
            재판 일정 확인
          </h2>
          <Calendar
            onChange={setDate}
            value={date}
            locale="en-US"
            activeStartDate={activeStartDate}
            onActiveStartDateChange={({ activeStartDate }) =>
              setActiveStartDate(activeStartDate)
            }
            tileContent={({ date: d }) => {
              const dateStr = d.toISOString().split("T")[0];
              return caseDates[dateStr] ? (
                <div className="text-xs font-semibold text-[#800020] mt-1">
                  {caseDates[dateStr]}건
                </div>
              ) : null;
            }}
            onClickDay={(clickedDate) => {
              const dateStr = clickedDate.toISOString().split("T")[0];
              if (caseDates[dateStr]) {
                onDateSelected(dateStr);
              }
            }}
            className="border-none text-center rounded-lg"
            formatDay={(locale, d) => d.getDate()}
            tileClassName={({ date: d, view }) => {
              if (view === "month") {
                return d.getMonth() === activeStartDate.getMonth()
                  ? "text-black"
                  : "text-gray-400";
              }
              return "text-black";
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

// (3) AICaseSummaryScreen
function AICaseSummaryScreen({ onBack, searchQuery }) {
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center space-x-2 cursor-pointer" onClick={onBack}>
        <ChevronLeft className="w-5 h-5 text-[#001F3F]" />
        <h1 className="text-xl font-bold text-[#001F3F]">AI 판례 요약 & 검색</h1>
      </div>

      <Card className="rounded-2xl shadow p-4 bg-[#FAFAFA]">
        <CardContent>
          <h2 className="text-lg font-semibold text-black">최신 판례 요약</h2>
          <p className="text-sm text-gray-600 mt-2">
            AI가 자동으로 최신 판례를 요약하였습니다. [여기에 요약 내용이 표시됩니다.]
          </p>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow p-4 bg-[#FAFAFA]">
        <CardContent>
          <h2 className="text-lg font-semibold text-black">유사 판례 추천</h2>
          <p className="text-sm text-gray-600 mt-2">
            입력하신 검색어 "<span className="font-bold">{searchQuery || "예시 검색어"}</span>"와 유사한 판례를 추천합니다.
          </p>
          <ul className="list-disc ml-5 mt-2">
            <li className="text-sm text-gray-700">판례 A - 관련 법 조항: [법 조항 내용]</li>
            <li className="text-sm text-gray-700">판례 B - 관련 법 조항: [법 조항 내용]</li>
            <li className="text-sm text-gray-700">판례 C - 관련 법 조항: [법 조항 내용]</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow p-4 bg-[#FAFAFA]">
        <CardContent>
          <h2 className="text-lg font-semibold text-black">특정 사건 키워드 검색 결과</h2>
          <p className="text-sm text-gray-600 mt-2">
            입력하신 키워드에 따른 관련 판례와 법 조항을 아래에 보여드립니다.
          </p>
          <ul className="list-disc ml-5 mt-2">
            <li className="text-sm text-gray-700">키워드 관련 판례 1 - 법 조항: [법 조항 내용]</li>
            <li className="text-sm text-gray-700">키워드 관련 판례 2 - 법 조항: [법 조항 내용]</li>
          </ul>
        </CardContent>
      </Card>

      <p className="text-xs text-gray-500">
        차별점: 한국 법률 정보를 쉽게 접근할 수 있도록 돕는 맞춤형 AI 법률 도우미
      </p>
    </div>
  );
}

// (4) ReservationScreen
function ReservationScreen({ onBack }) {
  const availableEvents = [
    {
      id: 1,
      caseName: "서울중앙지법, OO 사건 판결",
      availableSeats: 15,
      idRequired: true,
    },
    {
      id: 2,
      caseName: "부산지방법원, XX 사건",
      availableSeats: 0,
      idRequired: false,
    },
    {
      id: 3,
      caseName: "대구지방법원, YY 사건",
      availableSeats: 5,
      idRequired: true,
    },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center space-x-2 cursor-pointer" onClick={onBack}>
        <ChevronLeft className="w-5 h-5 text-[#001F3F]" />
        <h1 className="text-xl font-bold text-[#001F3F]">
          실시간 방청 & 예약 시스템
        </h1>
      </div>

      <Card className="rounded-2xl shadow p-4 bg-[#FAFAFA]">
        <CardContent>
          <h2 className="text-lg font-semibold text-black">
            방청 가능한 사건 리스트
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            아래 사건들은 현재 방청 예약이 가능합니다.
          </p>
          <ul className="mt-4 space-y-2">
            {availableEvents.map((event) => (
              <li key={event.id} className="border p-2 rounded-lg bg-white">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-black">{event.caseName}</span>
                  <span className="text-sm text-gray-600">남은 좌석: {event.availableSeats}</span>
                </div>
                <div className="mt-1 text-sm text-gray-600">
                  {event.idRequired ? "신분증 필요" : "신분증 필요 없음"}
                </div>
                <Button
                  className="mt-2 w-full rounded-2xl bg-[#001F3F] text-white hover:bg-gray-500"
                  disabled={event.availableSeats === 0}
                >
                  {event.availableSeats === 0 ? "예약 불가" : "예약하기"}
                </Button>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <p className="text-xs text-gray-500">
        차별점: 현재 한국에는 방청 정보를 실시간으로 제공하는 플랫폼이 없으며,
        방청석 사전 예약 기능을 통해 법원 방문자들에게 유용한 정보를 제공합니다.
      </p>
    </div>
  );
}

// (5) DiscussionScreen
function DiscussionScreen({ onBack }) {
  const discussions = [
    {
      id: 1,
      caseTitle: "OO 사건 판결",
      author: "홍길동",
      content:
        "이 판결이 정말 합당한가요? 피해자가 너무 억울해 보이는데, 여러분의 의견이 궁금합니다.",
      upvotes: 20,
      downvotes: 5,
    },
    {
      id: 2,
      caseTitle: "XX 사건 무죄 판결",
      author: "김철수",
      content:
        "무죄 판결에 대해 시민과 전문가 의견이 많이 갈리고 있습니다. 투표로 의견 남겨주세요!",
      upvotes: 12,
      downvotes: 3,
    },
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center space-x-2 cursor-pointer" onClick={onBack}>
        <ChevronLeft className="w-5 h-5 text-[#001F3F]" />
        <h1 className="text-xl font-bold text-[#001F3F]">
          법률 토론 & 집단 청원
        </h1>
      </div>

      <Card className="rounded-2xl shadow p-4 bg-[#FAFAFA]">
        <CardContent>
          <h2 className="text-lg font-semibold text-black">AI 여론 분석</h2>
          <p className="text-sm text-gray-600 mt-2">
            현재 토론 중인 판결들에 대한 AI 분석 결과입니다.
          </p>
          <ul className="list-disc ml-5 mt-2 text-sm text-gray-700">
            <li>OO 사건: 찬성 65%, 반대 35%</li>
            <li>XX 사건: 찬성 40%, 반대 60%</li>
          </ul>
          <p className="text-xs text-gray-500 mt-2">
            (여론 추이는 실시간으로 업데이트됩니다.)
          </p>
        </CardContent>
      </Card>

// ========== [Part 1 끝] ==========
// ========== [Part 2 시작] ==========

      <Card className="rounded-2xl shadow p-4 bg-[#FAFAFA]">
        <CardContent>
          <h2 className="text-lg font-semibold text-black">국민동의청원</h2>
          <p className="text-sm text-gray-600 mt-2">
            특정 사건에 대한 제도 개선이나 법률 개정을 원하시면 국민동의청원 페이지를
            통해 의견을 제출할 수 있습니다.
          </p>
          <Button
            className="mt-2 w-full rounded-2xl bg-[#001F3F] text-white hover:bg-gray-500"
            onClick={() => window.open("https://petitions.assembly.go.kr/", "_blank")}
          >
            국민동의청원 바로가기
          </Button>
        </CardContent>
      </Card>

      {discussions.map((disc) => (
        <Card key={disc.id} className="rounded-2xl shadow p-4 bg-white">
          <CardContent>
            <h2 className="text-md font-semibold text-black">{disc.caseTitle}</h2>
            <p className="text-sm text-gray-600">작성자: {disc.author}</p>
            <p className="text-sm text-gray-800 mt-2">{disc.content}</p>
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-4">
                <Button className="px-2 py-1 rounded bg-blue-500 text-white text-sm">
                  찬성 {disc.upvotes}
                </Button>
                <Button className="px-2 py-1 rounded bg-gray-500 text-white text-sm">
                  반대 {disc.downvotes}
                </Button>
              </div>
              <Button className="px-2 py-1 rounded bg-[#001F3F] text-white text-sm hover:bg-gray-500">
                댓글 달기
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="p-4 border rounded-lg bg-white">
        <h2 className="text-lg font-semibold text-black mb-2">새 토론 시작</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="논의하고 싶은 판결이나 사건을 적어주세요."
        />
        <Button className="mt-2 w-full rounded-2xl bg-[#001F3F] text-white hover:bg-gray-500">
          토론 주제 등록
        </Button>
      </div>

      <p className="text-xs text-gray-500">
        차별점: 재판이 끝나도 해당 판결에 대한 토론이 계속 진행될 수 있으며,
        사용자들의 의견이 법 개정이나 제도 변화에 영향을 줄 수 있습니다.
      </p>
    </div>
  );
}

// (6) ConsultationScreen
function ConsultationScreen({ onBack }) {
  const [attorneyQuery, setAttorneyQuery] = useState("");

  const attorneys = [
    { id: 1, name: "변호사 김민수", experience: 10, specialty: "형사 사건" },
    { id: 2, name: "변호사 박영희", experience: 7, specialty: "민사 / 가사" },
    { id: 3, name: "변호사 이철수", experience: 5, specialty: "부동산 / 계약" },
  ];

  const filteredAttorneys = attorneys.filter(
    (attorney) =>
      attorney.specialty.includes(attorneyQuery) ||
      attorney.name.includes(attorneyQuery)
  );

  return (
    <div className="p-4 space-y-6">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={onBack}
      >
        <ChevronLeft className="w-5 h-5 text-[#001F3F]" />
        <h1 className="text-xl font-bold text-[#001F3F]">법률 상담</h1>
      </div>

      <Card className="rounded-2xl shadow p-4 bg-[#FAFAFA]">
        <CardContent>
          <h2 className="text-lg font-semibold text-black">AI 챗봇 상담</h2>
          <p className="text-sm text-gray-600 mt-2">
            안녕하세요, 법률 상담 AI입니다. 궁금하신 법률 문제를 입력해주세요.
          </p>
          <div className="mt-4">
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="예: 계약서 관련 문의..."
            />
            <Button className="mt-2 w-full rounded-2xl bg-[#001F3F] text-white hover:bg-gray-500">
              상담 요청
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow p-4 bg-[#FAFAFA]">
        <CardContent>
          <h2 className="text-lg font-semibold text-black">무료 변호사 상담 연계</h2>
          <p className="text-sm text-gray-600 mt-2">
            법률구조공단 및 공익 변호사단체와 연계하여 무료 상담이 가능합니다.
          </p>
          <Button className="mt-2 w-full rounded-2xl bg-[#001F3F] text-white hover:bg-gray-500">
            무료 상담 연결
          </Button>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow p-4 bg-[#FAFAFA]">
        <CardContent>
          <h2 className="text-lg font-semibold text-black">일반 변호사 검색</h2>
          <p className="text-sm text-gray-600 mt-2">
            사건 키워드를 입력하면 해당 분야에 경험이 많은 변호사들을 보여드립니다.
          </p>
          <div className="mt-2 flex space-x-2">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="예: 형사, 민사, 이혼, 부동산 등"
              value={attorneyQuery}
              onChange={(e) => setAttorneyQuery(e.target.value)}
            />
            <Button className="rounded-lg bg-[#001F3F] text-white hover:bg-gray-500">
              검색
            </Button>
          </div>
        </CardContent>
      </Card>

      {filteredAttorneys.map((attorney) => (
        <Card key={attorney.id} className="rounded-2xl shadow p-4 bg-white">
          <CardContent>
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-md font-semibold text-black">{attorney.name}</h3>
                <p className="text-sm text-gray-600">
                  경험: {attorney.experience}년 / 분야: {attorney.specialty}
                </p>
              </div>
              <Button className="px-2 py-1 rounded bg-[#001F3F] text-white text-sm hover:bg-gray-500">
                채팅하기
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <p className="text-xs text-gray-500">
        차별점: AI 기반 법률 상담과 무료 변호사 매칭 기능뿐만 아니라,
        일반 변호사 검색을 통해 특정 사건 경험이 많은 변호사를 직접 채팅으로
        컨택할 수 있습니다.
      </p>
    </div>
  );
}

// (7) DetailScreen
function DetailScreen({ onBack }) {
  return (
    <div className="p-4 space-y-6">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={onBack}
      >
        <ChevronLeft className="w-5 h-5 text-[#001F3F]" />
        <h1 className="text-xl font-bold text-[#001F3F]">뉴스 상세 정보</h1>
      </div>

      <Card className="rounded-2xl shadow p-4 bg-[#FAFAFA]">
        <CardContent>
          <h2 className="text-xl font-semibold text-gray-900">OO초등생 살해 사건</h2>
          <p className="text-sm text-gray-500 mt-2">서울중앙지법 / 2025-03-21 10:00</p>
          <p className="text-sm text-gray-700 mt-2 font-semibold">담당 판사: 김민수 부장판사</p>
          <div className="border-t border-gray-200 mt-4 pt-4 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">사건 개요</h3>
              <p className="text-sm text-gray-700 mt-1">
                2024년 서울에서 발생한 OO초등생 살해 사건으로, 피고인은 피해자를 유인해
                살해한 후 유기한 혐의로 기소되었습니다. 전국민적 공분을 샀으며, 현재 3차
                공판을 앞두고 있습니다.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">재판 타임라인</h3>
              <ul className="text-sm text-gray-700 list-disc ml-5 mt-1">
                <li>1차 공판 - 2025-01-15 (피고인 혐의 인정 여부)</li>
                <li>2차 공판 - 2025-02-18 (증인 신문 진행)</li>
                <li>3차 공판 예정 - 2025-03-21 (최후 변론 및 구형)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">관련 뉴스</h3>
              <ul className="text-sm text-blue-600 list-disc ml-5 mt-1">
                <li>
                  <a href="https://news.sbs.co.kr/news/endPage.do?news_id=N1007854306">
                    SBS 단독 보도 - ‘OO초등생 사건’ 피고인 법정에서 울먹여
                  </a>
                </li>
                <li>
                  <a href="https://news.jtbc.co.kr/article/NB11715173?code=issue&idx=NK10000606">
                    JTBC - 피해자 부모 측 ‘엄벌 요구’
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <Button className="rounded-2xl mt-6 w-full bg-gray-300 text-black hover:bg-[#1A2238] hover:text-white">
            <Heart className="w-4 h-4 mr-2" /> 기부하기
          </Button>
          <Button className="rounded-2xl mt-6 w-full bg-[#1A2238] text-white hover:bg-gray-300 hover:text-black">
            <Bell className="w-4 h-4 mr-2" /> 재판 알림받기
          </Button>
          <Button className="rounded-2xl mt-6 w-full bg-gray-300 text-black hover:bg-[#1A2238] hover:text-white">
            <Bell className="w-4 h-4 mr-2" /> 방청 신청하기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// (8) DonationScreen
function DonationScreen() {
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-center mt-4">
        <Heart className="w-10 h-10 text-[#001F3F]" />
      </div>
      <Card className="rounded-lg shadow p-4 bg-[#FAFAFA] border border-gray-300 text-center">
        <CardContent>
          <h2 className="text-lg font-semibold text-black">기부로 함께하기</h2>
          <p className="text-sm text-gray-800 mt-2">
            법률 서비스 지원과 공익 향상을 위한 자선사업에 함께해 주세요. 기부를 통해
            사회 정의 구현에 동참할 수 있습니다.
          </p>
          <Button className="rounded-2xl mt-4 w-full bg-[#001F3F] text-white hover:bg-gray-500">
            피해자 지원을 위해 기부하실 수 있습니다.
          </Button>
          <p className="text-xs text-gray-600 mt-4">
            본 서비스는 법무부 산하 공익단체와 연결되어 있습니다.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// (9) CalendarScreen
function CalendarScreen({
  date,
  setDate,
  caseDates,
  activeStartDate,
  setActiveStartDate,
  onDateClick,
}) {
  return (
    <div className="p-4 space-y-6">
      <Card className="rounded-lg shadow p-4 bg-[#FAFAFA] border border-gray-300 text-center">
        <CardContent>
          <h2 className="text-lg font-semibold text-black mb-4">재판 일정 확인</h2>
          <Calendar
            onChange={setDate}
            value={date}
            locale="en-US"
            calendarType="US"
            activeStartDate={activeStartDate}
            onActiveStartDateChange={({ activeStartDate }) =>
              setActiveStartDate(activeStartDate)
            }
            tileContent={({ date: d }) => {
              const dateStr = d.toISOString().split("T")[0];
              return caseDates[dateStr] ? (
                <div className="text-xs font-semibold text-[#800020] mt-1">
                  {caseDates[dateStr]}건
                </div>
              ) : null;
            }}
            onClickDay={(value) => {
              if (!onDateClick) return;
              const dateStr = value.toISOString().split("T")[0];
              if (caseDates[dateStr]) {
                onDateClick(value);
              }
            }}
            className="border-none text-center rounded-lg"
            formatDay={(locale, d) => d.getDate()}
            tileClassName={({ date: d, view }) => {
              if (view === "month") {
                return d.getMonth() === activeStartDate.getMonth()
                  ? "text-black"
                  : "text-gray-400";
              }
              return "text-black";
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

// (10) NewsScreen
function NewsScreen({ onBack }) {
  const newsItems = [
    {
      id: 1,
      image: "https://via.placeholder.com/100",
      headline: "서울중앙지법, OO 사건 판결 발표",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/100",
      headline: "법률 전문가, 최신 판결 분석",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/100",
      headline: "국회, 법률 개정안 심의 예정",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/100",
      headline: "재판 일정, 이번 주 주요 사건",
    },
  ];

  return (
    <div className="p-4 space-y-4">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={onBack}
      >
        <ChevronLeft className="w-5 h-5 text-[#001F3F]" />
        <h1 className="text-xl font-bold text-[#001F3F]">최근 뉴스 이슈</h1>
      </div>
      {newsItems.map((item) => (
        <Card key={item.id} className="rounded-2xl shadow p-4 bg-[#FAFAFA]">
          <CardContent className="flex items-center">
            <img
              src={item.image}
              alt="news"
              className="w-16 h-16 object-cover rounded mr-4"
            />
            <div className="flex flex-col justify-center">
              <h2 className="text-md font-semibold text-black">{item.headline}</h2>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// (11) CaseListScreen
function CaseListScreen({ onBack, dateStr, casesData, onCaseSelect }) {
  const caseList = casesData[dateStr] || [];

  return (
    <div className="p-4 space-y-6">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={onBack}
      >
        <ChevronLeft className="w-5 h-5 text-[#001F3F]" />
        <h1 className="text-xl font-bold text-[#001F3F]">{dateStr} 재판 목록</h1>
      </div>
      {caseList.length === 0 ? (
        <p className="text-gray-600">재판 정보가 없습니다.</p>
      ) : (
        caseList.map((courtCase) => (
          <Card key={courtCase.id} className="rounded-2xl shadow p-4 bg-[#FAFAFA]">
            <CardContent>
              <h2 className="text-md font-semibold text-black">{courtCase.title}</h2>
              <p className="text-sm text-gray-600 mt-1">
                시간: {courtCase.time} / 장소: {courtCase.court}
              </p>
              <Button
                className="mt-2 w-full rounded-2xl bg-[#001F3F] text-white hover:bg-gray-500"
                onClick={() => onCaseSelect(courtCase.id)}
              >
                상세보기
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}

// (12) CaseDetailScreen
function CaseDetailScreen({ onBack, dateStr, caseId, casesData }) {
  const caseList = casesData[dateStr] || [];
  const foundCase = caseList.find((c) => c.id === caseId);

  if (!foundCase) {
    return (
      <div className="p-4">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={onBack}
        >
          <ChevronLeft className="w-5 h-5 text-[#001F3F]" />
          <h1 className="text-xl font-bold text-[#001F3F]">상세 정보</h1>
        </div>
        <p className="text-gray-600 mt-4">해당 재판 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={onBack}
      >
        <ChevronLeft className="w-5 h-5 text-[#001F3F]" />
        <h1 className="text-xl font-bold text-[#001F3F]">재판 상세 정보</h1>
      </div>
      <Card className="rounded-2xl shadow p-4 bg-[#FAFAFA]">
        <CardContent>
          <h2 className="text-xl font-semibold text-gray-900">{foundCase.title}</h2>
          <p className="text-sm text-gray-500 mt-2">
            {foundCase.court} / {dateStr} {foundCase.time}
          </p>
          <p className="text-sm text-gray-700 mt-2 font-semibold">
            담당 판사: {foundCase.judge}
          </p>
          <div className="border-t border-gray-200 mt-4 pt-4 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-800">사건 개요</h3>
              <p className="text-sm text-gray-700 mt-1">{foundCase.overview}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">재판 타임라인</h3>
              <ul className="text-sm text-gray-700 list-disc ml-5 mt-1">
                {foundCase.timeline.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">관련 뉴스</h3>
              {foundCase.relatedNews.length === 0 ? (
                <p className="text-sm text-gray-600 mt-1">관련 뉴스가 없습니다.</p>
              ) : (
                <ul className="text-sm text-blue-600 list-disc ml-5 mt-1">
                  {foundCase.relatedNews.map((news, idx) => (
                    <li key={idx}>
                      <a href={news.url} target="_blank" rel="noreferrer">
                        {news.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <Button className="rounded-2xl mt-6 w-full bg-gray-300 text-black hover:bg-[#1A2238] hover:text-white">
            <Heart className="w-4 h-4 mr-2" /> 기부하기
          </Button>
          <Button className="rounded-2xl mt-6 w-full bg-[#1A2238] text-white hover:bg-gray-300 hover:text-black">
            <Bell className="w-4 h-4 mr-2" /> 재판 알림받기
          </Button>
          <Button className="rounded-2xl mt-6 w-full bg-gray-300 text-black hover:bg-[#1A2238] hover:text-white">
            <Bell className="w-4 h-4 mr-2" /> 방청 신청하기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// (13) PredictionScreen
function PredictionScreen({ onBack }) {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);

  const handlePredict = () => {
    const dummyResult = {
      similarityCase: "유사 판례: 2019다12345 (대법원)",
      confidence: 75,
      lawyerOpinion: 70,
    };
    setResult(dummyResult);
  };

  return (
    <div className="p-4 space-y-6">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={onBack}
      >
        <ChevronLeft className="w-5 h-5 text-[#001F3F]" />
        <h1 className="text-xl font-bold text-[#001F3F]">AI 판결 예측</h1>
      </div>
      <Card className="rounded-2xl shadow p-4 bg-[#FAFAFA]">
        <CardContent>
          <h2 className="text-lg font-semibold text-black">사건 키워드 입력</h2>
          <p className="text-sm text-gray-600 mt-2">
            예: “계약 위반”, “상속 분쟁”, “교통사고 형사” 등
          </p>
          <div className="mt-2 flex space-x-2">
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              placeholder="사건 키워드를 입력하세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button
              className="rounded-lg bg-[#001F3F] text-white hover:bg-gray-500"
              onClick={handlePredict}
            >
              예측하기
            </Button>
          </div>
        </CardContent>
      </Card>
      {result && (
        <Card className="rounded-2xl shadow p-4 bg-[#FAFAFA]">
          <CardContent>
            <h2 className="text-lg font-semibold text-black">예측 결과</h2>
            <p className="text-sm text-gray-700 mt-2">
              <strong>{result.similarityCase}</strong>
            </p>
            <p className="text-sm text-gray-700 mt-2">
              AI 추정 승소 확률: <strong>{result.confidence}%</strong>
            </p>
            <p className="text-sm text-gray-700 mt-2">
              변호사 평균 예상: <strong>{result.lawyerOpinion}%</strong>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              * 판례 출처:{" "}
              <a
                href="https://portal.scourt.go.kr/pgp/index.on"
                target="_blank"
                rel="noreferrer"
                className="underline text-blue-600"
              >
                대법원 종합법률포털
              </a>
            </p>
          </CardContent>
        </Card>
      )}
      <p className="text-xs text-gray-500">
        차별점: 현재 어떤 법률 앱도 판결 예측을 제공하지 않으며,
        변호사 없이도 사건의 대략적인 결과를 예측할 수 있어
        일반 사용자들에게 유용합니다.
      </p>
    </div>
  );
}

// (14) LoginScreen
function LoginScreen({ onBack }) {
  return (
    <div className="p-4 space-y-6">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={onBack}
      >
        <ChevronLeft className="w-5 h-5 text-[#001F3F]" />
        <h1 className="text-xl font-bold text-[#001F3F]">로그인</h1>
      </div>
      <Card className="rounded-2xl shadow p-4 bg-[#FAFAFA]">
        <CardContent>
          <h2 className="text-lg font-semibold text-black">소셜 로그인</h2>
          <p className="text-sm text-gray-600 mt-2">
            아래 소셜 계정을 이용해 간편하게 로그인할 수 있습니다.
          </p>
          <div className="mt-4 flex flex-col space-y-2">
            <Button className="rounded-lg bg-yellow-400 text-black hover:bg-yellow-300">
              카카오톡 로그인
            </Button>
            <Button className="rounded-lg bg-green-500 text-white hover:bg-green-400">
              네이버 로그인
            </Button>
            <Button className="rounded-lg bg-red-500 text-white hover:bg-red-400">
              구글 로그인
            </Button>
            <Button className="rounded-lg bg-black text-white hover:bg-gray-700">
              애플 로그인
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// (15) LogoutScreen
function LogoutScreen({ onBack }) {
  return (
    <div className="p-4 space-y-6">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={onBack}
      >
        <ChevronLeft className="w-5 h-5 text-[#001F3F]" />
        <h1 className="text-xl font-bold text-[#001F3F]">로그아웃</h1>
      </div>
      <Card className="rounded-2xl shadow p-4 bg-[#FAFAFA]">
        <CardContent>
          <h2 className="text-lg font-semibold text-black">로그아웃</h2>
          <p className="text-sm text-gray-600 mt-2">
            로그아웃을 진행하시겠습니까?
          </p>
          <Button className="mt-4 w-full rounded-lg bg-[#001F3F] text-white hover:bg-gray-500">
            로그아웃하기
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// (16) MyPageScreen
function MyPageScreen({ onBack }) {
  return (
    <div className="p-4 space-y-6">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={onBack}
      >
        <ChevronLeft className="w-5 h-5 text-[#001F3F]" />
        <h1 className="text-xl font-bold text-[#001F3F]">마이페이지</h1>
      </div>
      <Card className="rounded-2xl shadow p-4 bg-[#FAFAFA]">
        <CardContent>
          <h2 className="text-lg font-semibold text-black">내 정보</h2>
          <p className="text-sm text-gray-600 mt-2">
            [사용자 이름], [가입일], [이메일], [등급] 등 사용자 정보를 표시할 수 있습니다.
          </p>
          <Button className="mt-4 w-full rounded-lg bg-[#001F3F] text-white hover:bg-gray-500">
            정보 수정
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// (17) SettingsScreen
function SettingsScreen({ onBack }) {
  return (
    <div className="p-4 space-y-6">
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={onBack}
      >
        <ChevronLeft className="w-5 h-5 text-[#001F3F]" />
        <h1 className="text-xl font-bold text-[#001F3F]">설정</h1>
      </div>
      <Card className="rounded-2xl shadow p-4 bg-[#FAFAFA]">
        <CardContent>
          <h2 className="text-lg font-semibold text-black">앱 설정</h2>
          <p className="text-sm text-gray-600 mt-2">
            알림, 테마, 언어 설정 등 다양한 옵션을 설정할 수 있습니다.
          </p>
          <Button className="mt-4 w-full rounded-lg bg-[#001F3F] text-white hover:bg-gray-500">
            설정 저장
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// (18) NavItem
function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center ${
        active ? "text-[#001F3F]" : "text-gray-500"
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
}

// (19) BottomNavigation
function BottomNavigation({ currentTab, setCurrentTab }) {
  return (
    <div className="flex justify-around border-t border-gray-300 bg-white py-2">
      <NavItem
        icon={<Home className="w-6 h-6" />}
        label="홈"
        active={currentTab === "home"}
        onClick={() => setCurrentTab("home")}
      />
      <NavItem
        icon={<FileText className="w-6 h-6" />}
        label="뉴스"
        active={currentTab === "news"}
        onClick={() => setCurrentTab("news")}
      />
      <NavItem
        icon={<DollarSign className="w-6 h-6" />}
        label="기부"
        active={currentTab === "donation"}
        onClick={() => setCurrentTab("donation")}
      />
      <NavItem
        icon={<Ticket className="w-6 h-6" />}
        label="방청"
        active={currentTab === "reservation"}
        onClick={() => setCurrentTab("reservation")}
      />
      <NavItem
        icon={<MessageSquare className="w-6 h-6" />}
        label="토론"
        active={currentTab === "discussion"}
        onClick={() => setCurrentTab("discussion")}
      />
      <NavItem
        icon={<HelpCircle className="w-6 h-6" />}
        label="상담"
        active={currentTab === "consultation"}
        onClick={() => setCurrentTab("consultation")}
      />
      <NavItem
        icon={<Activity className="w-6 h-6" />}
        label="예측"
        active={currentTab === "prediction"}
        onClick={() => setCurrentTab("prediction")}
      />
    </div>
  );
}

// ======================== 최종 App 컴포넌트 ========================
function LegalInsightsApp() {
  const [screen, setScreen] = useState("home");
  const [date, setDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(
    new Date(date.getFullYear(), date.getMonth(), 1)
  );
  const [searchQuery, setSearchQuery] = useState("");

  const caseDates = {
    "2025-03-22": 3,
    "2025-04-02": 1,
    "2025-04-10": 2,
  };

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCaseId, setSelectedCaseId] = useState(null);

  const renderScreen = () => {
    switch (screen) {
      case "home":
        return (
          <HomeScreen
            onDetail={() => setScreen("detail")}
            onSearch={() => setScreen("ai")}
            caseDates={caseDates}
            date={date}
            setDate={setDate}
            activeStartDate={activeStartDate}
            setActiveStartDate={setActiveStartDate}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onDateSelected={(dateStr) => {
              setSelectedDate(dateStr);
              setScreen("caseList");
            }}
          />
        );
      case "ai":
        return (
          <AICaseSummaryScreen
            onBack={() => setScreen("home")}
            searchQuery={searchQuery}
          />
        );
      case "reservation":
        return <ReservationScreen onBack={() => setScreen("home")} />;
      case "discussion":
        return <DiscussionScreen onBack={() => setScreen("home")} />;
      case "consultation":
        return <ConsultationScreen onBack={() => setScreen("home")} />;
      case "detail":
        return <DetailScreen onBack={() => setScreen("home")} />;
      case "donation":
        return <DonationScreen />;
      case "news":
        return <NewsScreen onBack={() => setScreen("home")} />;
      case "calendar":
        return (
          <CalendarScreen
            date={date}
            setDate={setDate}
            caseDates={caseDates}
            activeStartDate={activeStartDate}
            setActiveStartDate={setActiveStartDate}
            onDateClick={(clickedDate) => {
              const dateStr = clickedDate.toISOString().split("T")[0];
              if (caseDates[dateStr]) {
                setSelectedDate(dateStr);
                setScreen("caseList");
              }
            }}
          />
        );
      case "caseList":
        return (
          <CaseListScreen
            onBack={() => setScreen("home")}
            dateStr={selectedDate}
            casesData={casesData}
            onCaseSelect={(caseId) => {
              setSelectedCaseId(caseId);
              setScreen("caseDetail");
            }}
          />
        );
      case "caseDetail":
        return (
          <CaseDetailScreen
            onBack={() => setScreen("caseList")}
            dateStr={selectedDate}
            caseId={selectedCaseId}
            casesData={casesData}
          />
        );
      case "prediction":
        return <PredictionScreen onBack={() => setScreen("home")} />;

      // 로그인/로그아웃/마이페이지/설정
      case "login":
        return <LoginScreen onBack={() => setScreen("home")} />;
      case "logout":
        return <LogoutScreen onBack={() => setScreen("home")} />;
      case "mypage":
        return <MyPageScreen onBack={() => setScreen("home")} />;
      case "settings":
        return <SettingsScreen onBack={() => setScreen("home")} />;

      default:
        return (
          <HomeScreen
            onDetail={() => setScreen("detail")}
            onSearch={() => setScreen("ai")}
            caseDates={caseDates}
            date={date}
            setDate={setDate}
            activeStartDate={activeStartDate}
            setActiveStartDate={setActiveStartDate}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onDateSelected={(dateStr) => {
              setSelectedDate(dateStr);
              setScreen("caseList");
            }}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0] flex items-center justify-center">
      <div className="w-full max-w-md h-screen flex flex-col">
        <HeaderBar setScreen={setScreen} />
        <div className="flex-grow">
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={screen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </div>
        <BottomNavigation currentTab={screen} setCurrentTab={setScreen} />
      </div>
    </div>
  );
}

export default LegalInsightsApp;

// ========== [Part 2 끝] ==========
