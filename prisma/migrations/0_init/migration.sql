-- CreateTable
CREATE TABLE "article_store" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(100),
    "doi" VARCHAR(50),
    "author" VARCHAR(100),
    "link" VARCHAR(100),

    CONSTRAINT "article_store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "currently_reading" (
    "id" INTEGER NOT NULL,
    "start_date" DATE,
    "recordid" SERIAL NOT NULL,

    CONSTRAINT "currently_reading_pkey" PRIMARY KEY ("recordid")
);

-- CreateTable
CREATE TABLE "finished_reading" (
    "id" INTEGER NOT NULL,
    "review" TEXT,
    "rating" INTEGER,
    "recordid" SERIAL NOT NULL,

    CONSTRAINT "finished_reading_pkey" PRIMARY KEY ("recordid")
);

-- CreateTable
CREATE TABLE "want_to_read" (
    "id" INTEGER NOT NULL,
    "note" TEXT,
    "recordid" SERIAL NOT NULL,

    CONSTRAINT "want_to_read_pkey" PRIMARY KEY ("recordid")
);

-- AddForeignKey
ALTER TABLE "currently_reading" ADD CONSTRAINT "currently_reading_id_fkey" FOREIGN KEY ("id") REFERENCES "article_store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "finished_reading" ADD CONSTRAINT "finished_reading_id_fkey" FOREIGN KEY ("id") REFERENCES "article_store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "want_to_read" ADD CONSTRAINT "want_to_read_id_fkey" FOREIGN KEY ("id") REFERENCES "article_store"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

