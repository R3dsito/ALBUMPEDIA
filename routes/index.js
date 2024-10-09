import songRouter from "./songRouter.js";
import albumRouter from "./albumRouter.js";
import composerRouter from "./composerRouter.js";
import userRouter from "./userRouter.js";

const routerAPI = ( app) => {
    app.use('/songs', songRouter);
    app.use('/albums', albumRouter);
    app.use('/composers', composerRouter);
    app.use('/users', userRouter);
}

export default routerAPI;