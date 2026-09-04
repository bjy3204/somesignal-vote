import { useEffect, useState } from "react";

import StartPage from "./pages/StartPage";
import VerifyPage from "./pages/VerifyPage";
import PickPage from "./pages/PickPage";
import ContactPage from "./pages/ContactPage";
import PrivateMatchPage from "./pages/PrivateMatchPage";
import ReviewPage from "./pages/ReviewPage";

import {
  getVoteEventByCode,
  getParticipantsByMeetingId,
  submitVote,
  type VoteEvent,
  type VoteParticipant,
} from "./lib/voteApi";

type Page =
  | "start"
  | "verify"
  | "pick"
  | "contact"
  | "privateMatch"
  | "review";

type Gender = "male" | "female" | "";
type YesNo = "yes" | "no" | "";

type PrivateMatchChoice =
  | "yes"
  | "maybe"
  | "no"
  | "";

function App() {
  const [page, setPage] =
    useState<Page>("start");

  // =========================================================
  // 투표 이벤트
  // =========================================================

  const [voteEvent, setVoteEvent] =
    useState<VoteEvent | null>(null);

  const [participants, setParticipants] =
    useState<VoteParticipant[]>([]);

  const [isLoading, setIsLoading] =
    useState(false);

  const [loadError, setLoadError] =
    useState("");

  // =========================================================
  // 본인 정보
  // =========================================================

  const [participantId, setParticipantId] =
    useState<number | null>(null);

  const [name, setName] =
    useState("");

  const [gender, setGender] =
    useState<Gender>("");

  const [nickname, setNickname] =
    useState("");

  const [phone, setPhone] =
    useState("");

  // =========================================================
  // PICK
  // =========================================================

  const [
    selectedPickIds,
    setSelectedPickIds,
  ] = useState<number[]>([]);

  // =========================================================
  // 연락처 희망
  // =========================================================

  const [
    wantsContact,
    setWantsContact,
  ] = useState<YesNo>("");

  const [
    contactParticipantId,
    setContactParticipantId,
  ] = useState<number | null>(null);

  // =========================================================
  // 프라이빗 매칭
  // =========================================================

  const [
    privateMatch,
    setPrivateMatch,
  ] =
    useState<PrivateMatchChoice>("");

  // =========================================================
  // URL에서 투표 코드
  // =========================================================

  const getVoteCodeFromUrl = () => {
    const pathParts =
      window.location.pathname
        .split("/")
        .filter(Boolean);

    const voteIndex =
      pathParts.indexOf("vote");

    if (
      voteIndex !== -1 &&
      pathParts[voteIndex + 1]
    ) {
      return pathParts[
        voteIndex + 1
      ].toUpperCase();
    }

    const params =
      new URLSearchParams(
        window.location.search
      );

    const queryCode =
      params.get("code");

    if (queryCode) {
      return queryCode.toUpperCase();
    }

    return "";
  };

  // =========================================================
  // 투표 정보 로딩
  // =========================================================

  useEffect(() => {
    const loadVoteData =
      async () => {
        const code =
          getVoteCodeFromUrl();

        if (!code) {
          console.log(
            "투표 코드가 없습니다"
          );

          return;
        }

        try {
          setIsLoading(true);
          setLoadError("");

          const event =
            await getVoteEventByCode(
              code
            );

          const participantList =
            await getParticipantsByMeetingId(
              event.meeting_id
            );

          setVoteEvent(event);

          setParticipants(
            participantList
          );
        } catch (error) {
          console.error(error);

          setLoadError(
            "투표 정보를 불러오지 못했습니다"
          );
        } finally {
          setIsLoading(false);
        }
      };

    loadVoteData();
  }, []);

  // =========================================================
  // 성별 변경
  // =========================================================

  const handleGenderChange = (
    newGender: Gender
  ) => {
    if (gender !== newGender) {
      setParticipantId(null);
      setNickname("");

      setSelectedPickIds([]);

      setWantsContact("");
      setContactParticipantId(null);

      setPrivateMatch("");
    }

    setGender(newGender);
  };

  // =========================================================
  // PICK 닉네임 표시용
  // =========================================================

  const selectedPickNicknames =
    selectedPickIds
      .map(
        (id) =>
          participants.find(
            (participant) =>
              participant.id === id
          )?.seat_number
      )
      .filter(
        (
          value
        ): value is string =>
          Boolean(value)
      );

  // =========================================================
  // 연락처 상대 닉네임 표시용
  // =========================================================

  const contactNickname =
    contactParticipantId === null
      ? ""
      : participants.find(
          (participant) =>
            participant.id ===
            contactParticipantId
        )?.seat_number ?? "";

  // =========================================================
  // 실제 최종 제출
  // =========================================================

  const handleSubmitVote =
    async () => {
      if (!voteEvent) {
        throw new Error(
          "투표 정보가 없습니다"
        );
      }

      if (participantId === null) {
        throw new Error(
          "참가자 정보가 없습니다"
        );
      }

      if (selectedPickIds.length === 0) {
        throw new Error(
          "최소 한 명을 선택해 주세요"
        );
      }

      if (!privateMatch) {
        throw new Error(
          "1:1 프라이빗 매칭 항목을 선택해 주세요"
        );
      }

      await submitVote({
        voteEventId:
          voteEvent.id,

        participantId,

        enteredName:
          name.trim(),

        enteredGender:
          gender,

        enteredNickname:
          nickname,

        enteredPhone:
          phone,

        pick1Id:
          selectedPickIds[0],

        pick2Id:
          selectedPickIds[1] ??
          null,

        pick3Id:
          selectedPickIds[2] ??
          null,

        wantsContact:
          wantsContact === "yes",

        contactParticipantId:
          wantsContact === "yes"
            ? contactParticipantId
            : null,

        privateMatch,
      });
    };

  // =========================================================
  // 로딩
  // =========================================================

  if (isLoading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#111218",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily:
            "Pretendard, sans-serif",
          fontSize: "15px",
        }}
      >
        투표 정보를 불러오는 중입니다
      </div>
    );
  }

  // =========================================================
  // 오류
  // =========================================================

  if (loadError) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#111218",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          textAlign: "center",
          fontFamily:
            "Pretendard, sans-serif",
        }}
      >
        {loadError}
      </div>
    );
  }

  // =========================================================
  // START
  // =========================================================

  if (page === "start") {
    return (
      <StartPage
        onStart={() =>
          setPage("verify")
        }
      />
    );
  }

  // =========================================================
  // VERIFY
  // =========================================================

  if (page === "verify") {
    return (
      <VerifyPage
        onBack={() =>
          setPage("start")
        }
        onNext={() =>
          setPage("pick")
        }
        participants={participants}
        participantId={participantId}
        setParticipantId={
          setParticipantId
        }
        name={name}
        gender={gender}
        nickname={nickname}
        phone={phone}
        setName={setName}
        setGender={
          handleGenderChange
        }
        setNickname={setNickname}
        setPhone={setPhone}
      />
    );
  }

  // =========================================================
  // PICK
  // =========================================================

  if (page === "pick") {
    return (
      <PickPage
        onBack={() =>
          setPage("verify")
        }
        onNext={() =>
          setPage("contact")
        }
        gender={gender}
        participants={participants}
        selected={selectedPickIds}
        setSelected={
          setSelectedPickIds
        }
      />
    );
  }

  // =========================================================
  // CONTACT
  // =========================================================

  if (page === "contact") {
    return (
      <ContactPage
        onBack={() =>
          setPage("pick")
        }
        onNext={() =>
          setPage(
            "privateMatch"
          )
        }
        gender={gender}
        participants={participants}
        wantsContact={wantsContact}
        contactParticipantId={
          contactParticipantId
        }
        setWantsContact={
          setWantsContact
        }
        setContactParticipantId={
          setContactParticipantId
        }
      />
    );
  }

  // =========================================================
  // PRIVATE MATCH
  // =========================================================

  if (page === "privateMatch") {
    return (
      <PrivateMatchPage
        onBack={() =>
          setPage("contact")
        }
        onNext={() =>
          setPage("review")
        }
        privateMatch={privateMatch}
        setPrivateMatch={
          setPrivateMatch
        }
      />
    );
  }

  // =========================================================
  // REVIEW
  // =========================================================

  if (page === "review") {
    return (
      <ReviewPage
        onBack={() =>
          setPage(
            "privateMatch"
          )
        }
        onSubmit={
          handleSubmitVote
        }
        name={name}
        gender={gender}
        nickname={nickname}
        phone={phone}
        selectedPicks={
          selectedPickNicknames
        }
        wantsContact={wantsContact}
        contactNickname={
          contactNickname
        }
        privateMatch={privateMatch}
      />
    );
  }

  return null;
}

export default App;