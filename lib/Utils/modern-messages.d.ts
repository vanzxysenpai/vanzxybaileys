export const STATUS_NOTIFICATION_TYPES: Readonly<{
    STATUS_GROUP_STATUS_REPLY: 4;
    UNKNOWN: proto.Message.StatusNotificationMessage.StatusNotificationType.UNKNOWN;
    STATUS_ADD_YOURS: proto.Message.StatusNotificationMessage.StatusNotificationType.STATUS_ADD_YOURS;
    STATUS_RESHARE: proto.Message.StatusNotificationMessage.StatusNotificationType.STATUS_RESHARE;
    STATUS_QUESTION_ANSWER_RESHARE: proto.Message.StatusNotificationMessage.StatusNotificationType.STATUS_QUESTION_ANSWER_RESHARE;
}>;
export function makeQuestionMessage(input: any): {
    questionMessage: proto.Message.FutureProofMessage;
};
export function makeQuestionResponseMessage(input: any): {
    questionResponseMessage: proto.Message.QuestionResponseMessage;
};
export function makeQuestionReplyMessage(input: any): {
    questionReplyMessage: proto.Message.FutureProofMessage;
};
export function makeStatusQuestionAnswerMessage(input: any): {
    statusQuestionAnswerMessage: proto.Message.StatusQuestionAnswerMessage;
};
export function makeStatusQuotedMessage(input: any): {
    statusQuotedMessage: proto.Message.StatusQuotedMessage;
};
export function makeStatusStickerInteractionMessage(input: any): {
    statusStickerInteractionMessage: proto.Message.StatusStickerInteractionMessage;
};
export function makeStatusNotificationMessage(input: any): {
    statusNotificationMessage: proto.Message.StatusNotificationMessage;
};
export function makeNewsletterAdminInviteMessage(input: any): {
    newsletterAdminInviteMessage: proto.Message.NewsletterAdminInviteMessage;
};
export function makeNewsletterFollowerInviteMessage(input: any): {
    newsletterFollowerInviteMessageV2: proto.Message.NewsletterFollowerInviteMessage;
};
export function makePollAddOptionMessage(input: any): {
    pollAddOptionMessage: proto.Message.PollAddOptionMessage;
};
export function makeCommentMessage(input: any): {
    commentMessage: proto.Message.CommentMessage;
};
export function makeEventInviteMessage(input: any): {
    eventInviteMessage: proto.Message.EventInviteMessage;
};
export function makeScheduledCallCreationMessage(input: any): {
    scheduledCallCreationMessage: proto.Message.ScheduledCallCreationMessage;
};
export function makeScheduledCallEditMessage(input: any): {
    scheduledCallEditMessage: proto.Message.ScheduledCallEditMessage;
};
export function makeGroupStatusReactionMessage(input: any): {
    groupStatusMessageV2: proto.Message.FutureProofMessage;
};
export function makeNewsletterStatusAttribution(input: any): proto.StatusAttribution;
export function makeGroupStatusAttribution(input: any): proto.StatusAttribution;
export const STATUS_AUDIENCE_DEFAULT_LIST_NAME: "Close friends";
export const STATUS_AUDIENCE_DEFAULT_EMOJI: "\u2B50";
export function makeStatusAudienceMetadata(input: any): proto.ContextInfo.StatusAudienceMetadata;
export function makeMessageAssociation(input: any): proto.MessageAssociation;
export function makeStatusAddYoursAssociation(input: any): proto.MessageAssociation;
export function makeStatusMentionMessage(input: any): {
    [x: string]: proto.Message.FutureProofMessage;
};
export function prepareModernMessageContent(content: any): any;
import { proto } from '../../WAProto/index.js';
