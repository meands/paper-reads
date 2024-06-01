const { PrismaClient } = require("@prisma/client");
// TODO: fix esm
// import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const articles = [
  {
    id: 1,
    title: "Deep Residual Learning for Image Recognition",
    doi: "10.1109/CVPR.2016.90",
    authors: "Kaiming He, Xiangyu Zhang, Shaoqing Ren, Jian Sun",
  },
  {
    id: 2,
    title: "Attention Is All You Need",

    doi: "10.48550/arXiv.1706.03762",
    authors:
      "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin",
  },
  {
    id: 3,
    title: "ImageNet Classification with Deep Convolutional Neural Networks",
    doi: "10.1145/3065386",
    authors: "Alex Krizhevsky, Ilya Sutskever, Geoffrey E. Hinton",
  },
  {
    id: 4,
    title:
      "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    doi: "10.48550/arXiv.1810.04805",
    authors: "Jacob Devlin, Ming-Wei Chang, Kenton Lee, Kristina Toutanova",
  },
  {
    id: 5,
    title: "Generative Adversarial Nets",
    doi: "10.1145/3422622",
    authors:
      "Ian Goodfellow, Jean Pouget-Abadie, Mehdi Mirza, Bing Xu, David Warde-Farley, Sherjil Ozair, Aaron Courville, Yoshua Bengio",
  },
  {
    id: 6,
    title: "A Survey on Transfer Learning",
    doi: "10.1109/TKDE.2009.191",
    authors: "Sinno Jialin Pan, Qiang Yang",
  },
  {
    id: 7,
    title: "Sequence to Sequence Learning with Neural Networks",
    doi: "10.48550/arXiv.1409.3215",
    authors: "Ilya Sutskever, Oriol Vinyals, Quoc V. Le",
  },
  {
    id: 8,
    title: "Adam: A Method for Stochastic Optimization",
    doi: "10.48550/arXiv.1412.6980",
    authors: "Diederik P. Kingma, Jimmy Ba",
  },
  {
    id: 9,
    title: "Playing Atari with Deep Reinforcement Learning",
    doi: "10.48550/arXiv.1312.5602",
    authors:
      "Volodymyr Mnih, Koray Kavukcuoglu, David Silver, Alex Graves, Ioannis Antonoglou, Daan Wierstra, Martin Riedmiller",
  },
  {
    id: 10,
    title:
      "Neural Machine Translation by Jointly Learning to Align and Translate",
    doi: "10.48550/arXiv.1409.0473",
    authors: "Dzmitry Bahdanau, Kyunghyun Cho, Yoshua Bengio",
  },
];

async function main() {
  articles.forEach(async (article) => {
    await prisma.article_store.upsert({
      where: { id: article.id },
      update: {},
      create: {
        title: article.title,
        doi: article.doi,
        author: article.authors,
      },
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
