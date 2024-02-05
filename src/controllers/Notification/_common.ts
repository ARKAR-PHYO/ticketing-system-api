interface IPushNotificationTypesParameters {
  type: string;
  for: string;
  ticketNumber: string;
}
export const pushNotificationTypes = (
  params: IPushNotificationTypesParameters
) => {
  const obj_ = {
    ticketReview: {
      participants: {
        title: "New Ticket Assigned.",
        body: `New Ticket #${params.ticketNumber} available.`,
      },
    },
  };
  // @ts-ignore
  return obj_[params.type][params.for];
};
