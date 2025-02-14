// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

// pull in the required packages.
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import * as fs from "fs";
import _ from "lodash";

// pronunciation assessment with audio file
export async function sttFromMic() {
    var audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync(settings.filename));
    var speechConfig = sdk.SpeechConfig.fromSubscription(settings.subscriptionKey, settings.serviceRegion);

    var reference_text = "What's the weather like?";
    // create pronunciation assessment config, set grading system, granularity and if enable miscue based on your requirement.
    const pronunciationAssessmentConfig = new sdk.PronunciationAssessmentConfig(
        reference_text,
        sdk.PronunciationAssessmentGradingSystem.HundredMark,
        sdk.PronunciationAssessmentGranularity.Phoneme,
        true
    );
    pronunciationAssessmentConfig.enableProsodyAssessment = true;

    // setting the recognition language to English.
    speechConfig.speechRecognitionLanguage = settings.language;

    // create the speech recognizer.
    var reco = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    pronunciationAssessmentConfig.applyTo(reco);

    function onRecognizedResult(result) {
        console.log("pronunciation assessment for: ", result.text);
        var pronunciation_result = sdk.PronunciationAssessmentResult.fromResult(result);
        console.log(" Accuracy score: ", pronunciation_result.accuracyScore, '\n',
            "pronunciation score: ", pronunciation_result.pronunciationScore, '\n',
            "completeness score : ", pronunciation_result.completenessScore, '\n',
            "fluency score: ", pronunciation_result.fluencyScore, '\n',
            "prosody score: ", pronunciation_result.prosodyScore
        );
        console.log("  Word-level details:");
        _.forEach(pronunciation_result.detailResult.Words, (word, idx) => {
            console.log("    ", idx + 1, ": word: ", word.Word, "\taccuracy score: ", word.PronunciationAssessment.AccuracyScore, "\terror type: ", word.PronunciationAssessment.ErrorType, ";");
        });
        reco.close();
    }

    reco.recognizeOnceAsync(
        function (successfulResult) {
            onRecognizedResult(successfulResult);
        }
    )
}