"use strict";

const path = require('path');



var getSum = (numberArray) => {
    const summation = (total, num) => {
        return total + num;
    }

    if (numberArray.length > 0) {
        return numberArray.reduce(summation);
    } else {
        return 0;
    }
}

var getNumberOfMessages = (document, listSelector, itemSelector, badgeSelector) => {
    var list = document.querySelector(listSelector);

    try {
        var items = list.querySelectorAll(itemSelector);

        // Code here is to iterate
        var temp = [];

        for (let index = 0; index < items.length; index++) {

            // Extraction code to pull text from badge
            var element = items[index];
            var badge = element.querySelector(badgeSelector);
            var text = badge.firstChild.textContent;
            var value = parseInt(text);

            // Code to push value to temp array for summation
            temp.push(value);
        }

        return getSum(temp);
    } catch (error) {
        console.error(error);
        return 0;
    }
}

var getNumberOfDirectMessages = (document) => {
    const selectorConversationList = 'div.ConversationList';
    const selectorConversationItem = 'a.ConversationListItemContainer__link.ConversationListItemContainer__link--hasUnread';
    const selectorConversationItemBadge = 'span.UnreadBadge.ConversationListItemContainer__unreadBadge';
    return getNumberOfMessages(document, selectorConversationList, selectorConversationItem, selectorConversationItemBadge);
}

var getNumberOfIndirectMessages = (document) => {
    const selectorRoomList = 'div.RoomList';
    const selectorRoomItem = 'a.RoomListItemContainer__link.RoomListItemContainer__link--hasUnread';
    const selectorRoomItemBadge = 'span.UnreadBadge.RoomListItemContainer__unreadBadge';
    return getNumberOfMessages(document, selectorRoomList, selectorRoomItem, selectorRoomItemBadge);
}

module.exports = (Franz) => {
    const getMessages = () => {
        const directMessages = getNumberOfDirectMessages(document);
        const indirectMessages = getNumberOfIndirectMessages(document);

        Franz.setBadge(directMessages, indirectMessages);
    }

    Franz.loop(getMessages);
}