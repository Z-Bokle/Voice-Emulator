import sys
from pathlib import Path
from synthesizer.inference import Synthesizer
from encoder import inference as encoder
from vocoder.hifigan import inference as gan_vocoder
from vocoder.wavernn import inference as rnn_vocoder
import numpy as np
import re
from scipy.io.wavfile import write
import librosa
import io
import base64
import numpy as np
 
def main():
    
   
    # syn_models_dirt = "synthesizer/saved_models"
    # synthesizers = list(Path(syn_models_dirt).glob("**/*.pt"))
    synthesizers_cache = {}
    encoder.load_model(Path("encoder/saved_models/pretrained.pt"))
    rnn_vocoder.load_model(Path("vocoder/saved_models/pretrained/pretrained.pt"))
    gan_vocoder.load_model(Path("vocoder/saved_models/pretrained/g_hifigan.pt"))    
    
    # TODO Implementation with json to support more platform
    # Load synthesizer

    synt_path = sys.argv[1]

    if synthesizers_cache.get(synt_path) is None:
        current_synt = Synthesizer(Path(synt_path))
        synthesizers_cache[synt_path] = current_synt
    else:
        current_synt = synthesizers_cache[synt_path]
    print("using synthesizer model: " + str(synt_path))
    # Load input wav
    if sys.argv[2]:
        wav_base64 = sys.argv[2]
        wav = base64.b64decode(bytes(wav_base64, 'utf-8'))
        wav = pcm2float(np.frombuffer(wav, dtype=np.int16), dtype=np.float32)
        sample_rate = Synthesizer.sample_rate
    else:
        wav, sample_rate,  = librosa.load(sys.argv[3])
    write("temp.wav", sample_rate, wav) #Make sure we get the correct wav
        
    encoder_wav = encoder.preprocess_wav(wav, sample_rate)
    embed, _, _ = encoder.embed_utterance(encoder_wav, return_partials=True)
        
    # Load input text
    texts = filter(None, sys.argv[5].split("\n"))
    punctuation = '！，。、,' # punctuate and split/clean text
    processed_texts = []
    for text in texts:
        for processed_text in re.sub(r'[{}]+'.format(punctuation), '\n', text).split('\n'):
            if processed_text:
                processed_texts.append(processed_text.strip())
    texts = processed_texts

    # synthesize and vocode
    embeds = [embed] * len(texts)
    specs = current_synt.synthesize_spectrograms(texts, embeds)
    spec = np.concatenate(specs, axis=1)
    sample_rate = Synthesizer.sample_rate
    if "vocoder" in sys.argv[4] and sys.argv[4] == "WaveRNN":
        wav, sample_rate = rnn_vocoder.infer_waveform(spec)
    else:
        wav, sample_rate = gan_vocoder.infer_waveform(spec)

    # Return cooked wav
    out = io.BytesIO()
    write(out, sample_rate, wav.astype(np.float32))
    

    #1是模型选择，2是录音的音频，3是选择文件的音频，4是文字，5是vocoder

    #后面需要用到的变量直接调用，并在前面加上类似 a = sys.argv[n] 的初始化
    #下标n代表传进来的参数序号，从1开始(0是被运行的python文件名)
    #需要什么直接在前面声明，并作为外部传入参数直接获取就行，到时候我会根据你用到的参数情况，直接从node把需要的参数传进来
    
    #以上是直接传参的方法，如果需要的参数数目比较多，可以用json的形式传信息
    
    #传参具体参考https://blog.csdn.net/Ed7zgeE9X/article/details/120944262
    #python脚本运行结束后回传一个信息给node，以通知node可以将就绪的音频传回给用户
if __name__ == '__main__':
    main()