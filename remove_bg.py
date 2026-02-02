from PIL import Image
import numpy as np

# Abrir a imagem original
img = Image.open('logo-solida.png')

# Converter para RGBA se não estiver
if img.mode != 'RGBA':
    img = img.convert('RGBA')

# Converter para array numpy
data = np.array(img)

# Obter as cores RGB
rgb = data[:, :, :3]

# Detectar pixels brancos ou muito claros (fundo)
# Consideramos branco se R, G e B são maiores que 240
white_pixels = np.all(rgb > 240, axis=2)

# Tornar transparente os pixels brancos
data[white_pixels, 3] = 0

# Criar nova imagem com transparência
transparent_img = Image.fromarray(data, 'RGBA')

# Salvar
transparent_img.save('logo-solida.png')

print("Fundo branco removido com sucesso! A imagem agora está com fundo transparente.")
