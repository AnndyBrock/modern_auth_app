import catchErrors from "../utils/catchErrors";
import { OK } from "../constants/http";
import SessionModel from "../models/session.model";

export const getSessionHandler = catchErrors(async (req, res) => {
    const userId = res.locals?.userId;
    const sessionId = res.locals?.sessionId;

    const sessions = await SessionModel.find({
        userId,
        expiresAt: { $gt: new Date() }
    },{
        _id: 1, userAgent: 1, createdAt: 1
    }, { sort: { createdAt: -1 } });

    res.status(OK).json(sessions.map(x => ({
        ...x.toObject(), ...(x.id === sessionId && { isCurrent: true })
    })));
});
