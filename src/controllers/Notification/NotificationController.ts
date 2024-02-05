import prisma from "../../lib/prisma";
import { sendNotification } from "../../helpers/push-noti";
import { pushNotificationTypes } from "./_common";

class NotificationController {
  private input: any;
  private participantIds: any;
  private notificationDb: any;
  private notificationRecipientList: any;
  private pushNotification: any;
  private pushNotificationTypes: any;

  constructor(props: any) {
    this.input = props.body;
    this.participantIds = props.participantIds;
    this.notificationRecipientList = props.notificationRecipientList;
    this.notificationDb = prisma.notification;
    this.pushNotification = sendNotification;
    this.pushNotificationTypes = pushNotificationTypes;
  }

  private async createNotification(userId: string) {
    const values = this.pushNotificationTypes({
      ...this.input,
    });
    await this.notificationDb.create({
      data: {
        title: values.title,
        body: values.body,
        userId: userId,
        isRead: false,
      },
    });
  }

  private async sendNotification() {
    if (this.notificationRecipientList && this.notificationRecipientList.length)
      await this.pushNotification(
        this.notificationRecipientList,
        (result: any) => {
          console.log(
            `Out of ${this.notificationRecipientList.length} notification, SUCCESS: ${result.successCount} FAILED: ${result.failureCount}`
          );
          if (result.failureCount > 0) {
            console.log("FULL PUSH NOTIFICATION RESULT: ", result);
          }
        }
      );
  }

  private async getToken(where: any) {
    return prisma.users.findFirst({
      select: {
        FcmTokens: true,
      },
      where,
    });
  }

  async puthToParticipants() {
    console.log(`---[PUSH NOTIFICATION TO PARTICIPANTS START]---`);
    const participants = await prisma.users.findMany({
      where: {
        ticketParticipantIds: {
          hasSome: this.participantIds,
        },
      },
      select: {
        id: true,
        fullName: true,
      },
    });
    this.notificationRecipientList = [];
    let usersWithTokenCount = 0;
    for (let i = 0; i < participants.length; i++) {
      const participant = participants[i];
      if (participant) {
        await this.createNotification(participant.id);
        const values = this.pushNotificationTypes({
          ...this.input,
        });
        const tokenUsers = await this.getToken({ id: participant.id });

        // filter, only send notification to those that have a token.
        if (tokenUsers && tokenUsers.FcmTokens.length) {
          this.notificationRecipientList = [];
          tokenUsers.FcmTokens.map((token) => {
            this.notificationRecipientList.push({
              token: token.fcmToken,
              notification: {
                title: values.title,
                body: values.body,
              },
              data: {
                ticketNumber: this.input.ticketNumber || "",
                type: this.input.type,
              },
            });
          });
          usersWithTokenCount++;
        }
        console.log(
          "this.notificationRecipientList: ",
          this.notificationRecipientList
        );
      }
    }
    await this.sendNotification();
    console.log(
      `---OUT OF ${participants.length}, ONLY ${usersWithTokenCount} HAVE TOKEN.---`
    );
    console.log(`---[PUSH NOTIFICATION TO PARTICIPANTS END]---`);
  }
}

export default NotificationController;
