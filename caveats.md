# Vercel Function Challenges
I ran into a few challenges when trying to deploy this on Vercel Functions.

Originally, I had a file in `api/handler.tsx`. It compiled via `tsc` successfully. When I ran `vercel dev`, the program ran successfully. However, Vercel also spat out a bunch of erroneous TS warnings. I think Vercel has a bug where it tries to compile using the wrong settings.

To work around that, we emit a JS file, then run that via Vercel.

But then I found that Vercel wouldn't run the JS file that was created as part of the `vercel-build` [custom build step](https://vercel.com/docs/concepts/functions/serverless-functions/runtimes/node-js#custom-build-step-for-node.js). To work around that, I checked in the JS file, and then everything worked.