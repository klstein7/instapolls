-- CreateTable
CREATE TABLE "OptionVote" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "optionId" TEXT NOT NULL,

    CONSTRAINT "OptionVote_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OptionVote" ADD CONSTRAINT "OptionVote_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "PollOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;
