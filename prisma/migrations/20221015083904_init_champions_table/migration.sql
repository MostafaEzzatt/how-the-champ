-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Champions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "blurb" TEXT NOT NULL,
    "imagesURLs" TEXT[],
    "spells" TEXT[],
    "tags" TEXT[],

    CONSTRAINT "Champions_pkey" PRIMARY KEY ("id")
);
