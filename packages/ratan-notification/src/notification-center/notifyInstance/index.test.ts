import { NotifyInstance } from "./index";

describe('notifyInstance', () => {
  it("notifyInstance - open", () => {
    const notifyInstance = new NotifyInstance();

    notifyInstance.open({
        data: null,
        notify: {
          title: "test_title",
          body: "test_desc",
          type: "success",
        },
        timestamp: 0,
    });
  });
});