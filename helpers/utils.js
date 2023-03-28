const fs = require("fs");
const path = require("path");
const RedisContext = require("../redis");

const getGolfer = (id, golfers) => {
  return golfers.find((g) => g._id === id);
};

function reverse(s) {
  return s.split("").reverse().join("");
}

const pairScore = {
  3: {
    0: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645601/golf/ZIP%20GOlF/01-PAR-PNG/Par3-Over_n162sf.png",
      shot: "",
    },
    1: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645601/golf/ZIP%20GOlF/01-PAR-PNG/Par3-Shot1_ipkpsf.png",
      shot: "1ST SHOT",
    },
    2: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645602/golf/ZIP%20GOlF/01-PAR-PNG/Par3-Shot2_qi55or.png",
      shot: "FOR BIRDIE",
    },
    3: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645603/golf/ZIP%20GOlF/01-PAR-PNG/Par3-Shot3_gqai3m.png",
      shot: "FOR PAR",
    },
    4: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645601/golf/ZIP%20GOlF/01-PAR-PNG/Par3-Over_n162sf.png",
      shot: "FOR BOGEY",
    },
    5: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645601/golf/ZIP%20GOlF/01-PAR-PNG/Par3-Over_n162sf.png",
      shot: "FOR DOUBLE BOGEY",
    },
    n: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645601/golf/ZIP%20GOlF/01-PAR-PNG/Par3-Over_n162sf.png",
      shot: "",
    },
  },
  4: {
    0: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645601/golf/ZIP%20GOlF/01-PAR-PNG/Par4-Over_umcjjf.png",
      shot: "",
    },
    1: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645604/golf/ZIP%20GOlF/01-PAR-PNG/Par4-Shot1_rs40db.png",
      shot: "1ST SHOT",
    },
    2: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645604/golf/ZIP%20GOlF/01-PAR-PNG/Par4-Shot2_m78jj9.png",
      shot: "2ND SHOT",
    },
    3: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645604/golf/ZIP%20GOlF/01-PAR-PNG/Par4-Shot3_ygyxwn.png",
      shot: "FOR BIRDIE",
    },
    4: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645604/golf/ZIP%20GOlF/01-PAR-PNG/Par4-Shot4_r6kdtb.png",
      shot: "FOR PAR",
    },
    5: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645601/golf/ZIP%20GOlF/01-PAR-PNG/Par4-Over_umcjjf.png",
      shot: "FOR BOGEY",
    },
    6: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645601/golf/ZIP%20GOlF/01-PAR-PNG/Par4-Over_umcjjf.png",
      shot: "FOR DOUBLE BOGEY",
    },
    n: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645601/golf/ZIP%20GOlF/01-PAR-PNG/Par4-Over_umcjjf.png",
      shot: "",
    },
  },
  5: {
    0: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645601/golf/ZIP%20GOlF/01-PAR-PNG/Par5-Over_b0k8jm.png",
      shot: "",
    },
    1: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645603/golf/ZIP%20GOlF/01-PAR-PNG/Par5-Shot1_llu9co.png",
      shot: "1ST SHOT",
    },
    2: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645603/golf/ZIP%20GOlF/01-PAR-PNG/Par5-Shot2_iqtwcl.png",
      shot: "2ND SHOT",
    },
    3: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645603/golf/ZIP%20GOlF/01-PAR-PNG/Par5-Shot3_qvmcv4.png",
      shot: "3RD SHOT",
    },
    4: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645603/golf/ZIP%20GOlF/01-PAR-PNG/Par5-Shot4_fkuawd.png",
      shot: "FOR BIRDIE",
    },
    5: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645602/golf/ZIP%20GOlF/01-PAR-PNG/Par5-Shot5_lfdq1y.png",
      shot: "FOR PAR",
    },
    6: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645601/golf/ZIP%20GOlF/01-PAR-PNG/Par5-Over_b0k8jm.png",
      shot: "FOR BOGEY",
    },
    7: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645601/golf/ZIP%20GOlF/01-PAR-PNG/Par5-Over_b0k8jm.png",
      shot: "FOR DOUBLE BOGEY",
    },
    n: {
      image:
        "https://res.cloudinary.com/dp9aicyj8/image/upload/v1677645601/golf/ZIP%20GOlF/01-PAR-PNG/Par5-Over_b0k8jm.png",
      shot: "",
    },
  },
};

module.exports = {
  writeResultJson: (data) => {
    const filePath = path.join(__dirname, "../public/result.json");
    try {
      const file = fs.readFileSync(filePath, { encoding: "utf-8" });
      const content = JSON.parse(file);
      const match = content[0];
      const newContent = { ...match, ...data };
      fs.writeFileSync(filePath, JSON.stringify([newContent]), {
        encoding: "utf-8",
      });
    } catch (error) {
      console.error(error);
    }
  },
  convertData: async (data) => {
    const { match, hole, score, team, golferSelect } = data;
    const redis = RedisContext.getConnect();

    /** setup User */
    const golfer1 = match.golfer_0_a;
    const golfer2 = match.golfer_0_b ? match.golfer_0_b : "";
    const golfer3 = match.golfer_1_a;
    const golfer4 = match.golfer_1_b ? match.golfer_1_b : "";

    /** setup Score */
    const key1 = `${match._id}_${match.team_0}_${golfer1}_${hole.name}_${hole.pair}`;
    const key2 =
      typeof golfer2 !== "string"
        ? `${match._id}_${match.team_0}_${golfer2}_${hole.name}_${hole.pair}`
        : undefined;
    const key3 = `${match._id}_${match.team_1}_${golfer3}_${hole.name}_${hole.pair}`;
    const key4 =
      typeof golfer4 !== "string"
        ? `${match._id}_${match.team_1}_${golfer4}_${hole.name}_${hole.pair}`
        : undefined;
    let score1 = "";
    let score2 = "";
    let score3 = "";
    let score4 = "";
    try {
      score1 = parseInt((await redis.get(key1)) || "0");
      score2 = key2 ? parseInt((await redis.get(key2)) || "0") : undefined;
      score3 = parseInt((await redis.get(key3)) || "0");
      score4 = key4 ? parseInt((await redis.get(key4)) || "0") : undefined;

      switch (golferSelect) {
        case golfer1:
          score1 = score;
          redis.set(key1, JSON.stringify(score));
          break;
        case golfer2:
          score2 = score;
          redis.set(key2, JSON.stringify(score));
          break;
        case golfer3:
          score3 = score;
          redis.set(key3, JSON.stringify(score));
          break;
        case golfer4:
          score4 = score;
          redis.set(key4, JSON.stringify(score));
          break;
      }
    } catch (error) {
      console.error(error);
    }
    /** setup result */
    const result = {
      Match: match.name,
      "G1-Team-01": golfer1,
      "G2-Team-01": typeof golfer2 === "string" ? golfer2 : "",
      "G1-Team-02": golfer3,
      "G2-Team-02": typeof golfer4 === "string" ? golfer4 : "",
      ScoreT1:
        match.score < 0
          ? `${Math.abs(match.score)}UP`
          : match.score > 0
          ? `${Math.abs(match.score)}DN`
          : "TIED",
      ScoreT2:
        match.score > 0
          ? `${Math.abs(match.score)}UP`
          : match.score < 0
          ? `${Math.abs(match.score)}DN`
          : "TIED",
      Hole: reverse(hole.name),
      PAR: hole.pair,
      "G1-T01-Shot": pairScore[hole.pair][score1].image,
      "G1-T01-ForShot": pairScore[hole.pair][score1].shot,
      "G2-T01-Shot": score2 ? pairScore[hole.pair][score2].image : "",
      "G2-T01-ForShot": score2 ? pairScore[hole.pair][score2].shot : "",
      "G1-T02-Shot": pairScore[hole.pair][score3].image,
      "G1-T02-ForShot": pairScore[hole.pair][score3].shot,
      "G2-T02-Shot": score4 ? pairScore[hole.pair][score4].image : "",
      "G2-T02-ForShot": score4 ? pairScore[hole.pair][score4].shot : "",
    };
    return result;
  },
};
