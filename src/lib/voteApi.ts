import { supabase } from "./supabase";

export type VoteEvent = {
  id: string;
  meeting_id: string;
  code: string;
  title: string;
  status: "준비중" | "진행중" | "마감";
};

export type VoteParticipant = {
  id: number;
  meeting_id: string;
  gender: string;
  seat_number: string | null;
};

export type SubmitVoteParams = {
  voteEventId: string;
  participantId: number;

  enteredName: string;
  enteredGender: string;
  enteredNickname: string;
  enteredPhone: string;

  pick1Id: number;
  pick2Id: number | null;
  pick3Id: number | null;

  wantsContact: boolean;
  contactParticipantId: number | null;

  privateMatch: "yes" | "maybe" | "no";
};


/* =========================================================
   투표 정보 조회
========================================================= */

export async function getVoteEventByCode(
  code: string
): Promise<VoteEvent> {

  const { data, error } =
    await supabase.rpc(
      "get_vote_event_by_code",
      {
        p_code: code
      }
    );

  if (error) {
    console.error(
      "투표 이벤트 조회 오류:",
      error
    );

    throw new Error(
      "투표 정보를 불러오지 못했습니다"
    );
  }

  const row =
    Array.isArray(data)
      ? data[0]
      : data;

  if (!row) {
    throw new Error(
      "존재하지 않는 투표입니다"
    );
  }

  return row as VoteEvent;
}


/* =========================================================
   결제완료 참가자 조회
========================================================= */

export async function getParticipantsByMeetingId(
  meetingId: string
): Promise<VoteParticipant[]> {

  const { data, error } =
    await supabase.rpc(
      "get_vote_participants",
      {
        p_meeting_id: meetingId
      }
    );

  if (error) {
    console.error(
      "참가자 조회 오류:",
      error
    );

    throw new Error(
      "참가자 정보를 불러오지 못했습니다"
    );
  }

  return (data ?? []) as VoteParticipant[];
}


/* =========================================================
   최종 투표 제출
========================================================= */

export async function submitVote(
  params: SubmitVoteParams
): Promise<number> {

  const { data, error } =
    await supabase.rpc(
      "submit_vote",
      {
        p_vote_event_id:
          params.voteEventId,

        p_participant_id:
          params.participantId,

        p_entered_name:
          params.enteredName,

        p_entered_gender:
          params.enteredGender,

        p_entered_nickname:
          params.enteredNickname,

        p_entered_phone:
          params.enteredPhone,

        p_pick_1_id:
          params.pick1Id,

        p_pick_2_id:
          params.pick2Id,

        p_pick_3_id:
          params.pick3Id,

        p_wants_contact:
          params.wantsContact,

        p_contact_participant_id:
          params.contactParticipantId,

        p_private_match:
          params.privateMatch
      }
    );

  if (error) {
    console.error(
      "최종 투표 제출 오류:",
      error
    );

    throw new Error(
      error.message
      || "투표 제출에 실패했습니다"
    );
  }

  return data as number;
}