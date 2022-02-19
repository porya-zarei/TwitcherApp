import {mount} from "@cypress/react";
import { QueryClient, QueryClientProvider } from "react-query";

import TweetView from "../../../../components/core-ui/tweet-view/tweet-view";
import {Tweet} from "../../../../types/data/tweet";

const fakeTweet: Tweet = {
    tweetId: "12345",
    content: "fake tweet",
    createdAt: new Date(),
    hashtags: ["#fake", "#tweet"],
    images: ["https://via.placeholder.com/150"],
    likesCount: 20,
    reTweetType: 0,
    repliesCount: 10,
    retweetsCount: 30,
    title: "fake tweet",
    video: "",
    baseTweet: {} as Tweet,
    sender: {
        userId: "12345",
        firstName: "John",
        lastName: "Doe",
        bio: "I am a developer",
        profileImage: "https://via.placeholder.com/150",
        backgroundImage: "https://via.placeholder.com/150",
        birthDay: "01/01/1990",
        email: "example@test.com",
        followersCount: 10,
        followingsCount: 100,
        interestedCategories: [
            {
                categoryId: "12345",
                name: "Technology",
                description: "Technology",
                categoryType: 2,
                followers: [],
                mainCategory: {} as any,
                mainCategoryId: "12345",
                subCategories: [],
            },
        ],
        joinedAt: new Date(),
        phoneNumber: "123456789",
        status: 0,
        statusText: "Happy",
        userName: "JohnDoe",
        userType: 0,
    },
};

describe("TweetView component", () => {
    beforeEach(() => {
        mount(
            <QueryClientProvider client={new QueryClient()}>
                <TweetView tweet={fakeTweet} />
            </QueryClientProvider>,
        );
    });
    it("test attribuites", () => {
        cy.get("article").should(
            "have.class",
            "w-full relative flex justify-evenly items-start flex-nowrap flex-row border-b-[1.2px] border-slate-400 px-2 py-1",
        ).get("header.w-auto.flex").should("be.visible")
        cy.get("main").should("be.visible")
            .should("contain.text", "fake tweet");
        cy.get("img").should("be.visible");
    });
});
