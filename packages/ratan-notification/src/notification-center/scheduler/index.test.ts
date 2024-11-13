import { from } from "rxjs";

import { NotificationScheduler } from "./index";

describe("NotificationScheduler", () => {
    it("NotificationScheduler - add", () => {
        const ns = new NotificationScheduler();
        ns.add({
            processor: from(Promise.resolve([])),
            notify: () => {
                return {
                    title: "test_title",
                    description: "test_desc",
                    type: "success",
                }
            },
        });

        expect(ns.queue.length).toBe(1);
    });
});