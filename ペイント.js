
	window.onload = function() {
		
		var canvas = document.getElementById('mycanvas');
		var dlLink = document.getElementById('download_link');
		
		<!--�t�@�C����-->
		var name = 'dlpaint.png';
		
		<!--canvas�Ή����̂ݕ`��X�N���v�g�N��-->
		if (canvas.getContext){
			var ctx = canvas.getContext('2d');
		}
		
		<!--�`��ݒ�-->
		var drawing = false;
		var before_x = 0;
		var before_y = 0;
		
		<!--�}�E�X�𓮂��������̓���-->
		canvas.addEventListener('mousemove', draw_canvas);
		
		<!--�}�E�X���N���b�N����Ă��鎞�̓���-->
		canvas.addEventListener('mousedown', function(e) {
			drawing = true;
			var rect = e.target.getBoundingClientRect();
			before_x = e.clientX - rect.left;
			before_y = e.clientY - rect.top;
		});
		
		<!--�}�E�X���N���b�N����߂����̓���-->
		canvas.addEventListener('mouseup', function() {
			drawing = false;
		});
		
		<!--canvas�̕`��ݒ�-->
		function draw_canvas(e) {
			
			<!--�N���b�N���̂ݕ`�悳���悤�ɐݒ�-->
			if(!drawing) {
				reuturn
			};
			
			<!--�}�E�X�ʒu�̑��-->
			var rect = e.target.getBoundingClientRect();
			var x = e.clientX - rect.left;
			var y = e.clientY - rect.top;
			
			<!--���C���E�L���b�v�E�X�^�C���̎w��(butt,round,square)-->
			var LineStyle = document.getElementById('lineCapStyle').value;
			ctx.lineCap = LineStyle;
			
			<!--�g���F�E�X�^�C���̎w��-->
			var color = document.getElementById('color').value;
			ctx.strokeStyle = color;
			
			<!--���̑����ݒ�-->
			var w = document.getElementById('width').value;
			ctx.lineWidth = w;
			
			<!--���݂̃p�X�̏�����-->
			ctx.beginPath();
			
			<!--�w��n�_�ŐV�K�T�u�p�X�𐶐�-->
			ctx.moveTo(before_x, before_y);
			
			<!--�T�u�p�X���猻�݂̃p�X�֒���������-->>
			ctx.lineTo(x, y);
			
			<!--���݂̃X�g���[�N�X�^�C���ŃT�u�p�X�ɐ�������-->
			ctx.stroke();
			
			<!--�T�u�p�X�����-->
			ctx.closePath();
			
			before_x = x;
			before_y = y;
		};
		
		
		<!--�L�����p�X�̏�����-->
		document.getElementById('clearBtn').addEventListener('click', function() {
		
		ret = confirm('�L�����o�X�̓��e�����������܂��B')
		
			if(ret == true){
				ctx.clearRect(0,0,canvas.width, canvas.height);
			}
		});
	
		<!--�L�����p�X�̓h��Ԃ�-->
		document.getElementById('paintClearBtn').addEventListener('click', function() {
		ctx.fillStyle = document.getElementById('paintClear').value;
		ctx.fillRect(0,0,canvas.width,canvas.height);
		});
		
		<!--�L�����o�X�̕ۑ�-->
		document.getElementById('dlBtn').addEventListener('click', function() {
			
			if (window.navigator.msSaveBlob) {
			
				<!--IE�ŕۑ�����ꍇ-->
				if(ret == true)
				var blob = canvas.msToBlob();
				window.navigator.msSaveBlob(blob, name);
				
			} else {
			
				<!-- chome�EOpelra�ŕۑ�����ꍇ(���̑��Ή��Ǝv���邪���m�F) -->
				ret = confirm('�L�����o�X�̓��e��ۑ����܂��B')
				
				if(ret == true){
					dlLink.href = canvas.toDataURL('image/png');
					dlLink.download = name;
 					dlLink.click();
				}
			
			}
		});
		
		<!-- �摜�̓ǂݍ��� -->
		document.getElementById('uploadFile').addEventListener('change', function(e) {
			var fileData = e.target.files[0];
			var reader = new FileReader();
			
			<!-- �L�����o�X���̃f�[�^���N���A -->>
			reader.onload = function() {
				ctx.clearRect(0,0,canvas.width,canvas.height);
				var img = new Image();
				img.src = reader.result;
				
			<!-- �摜���L�����o�X�̘g���Ɏ��߂ē\��t��(���k�������̂���) -->
				img.onload = function() {
					ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				}
			};
			
			reader.readAsDataURL(fileData);
		});
		
		document.getElementById('uploadFile').addEventListener('click', function(e) {
			document.getElementById('uploadFile').value = "";
		});
		
	}

