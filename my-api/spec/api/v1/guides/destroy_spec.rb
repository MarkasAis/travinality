require 'rails_helper'

RSpec.describe "guides#destroy", type: :request do
  subject(:make_request) do
    jsonapi_delete "/api/v1/guides/#{guide.id}"
  end

  describe 'basic destroy' do
    let!(:guide) { create(:guide) }

    it 'updates the resource' do
      expect(GuideResource).to receive(:find).and_call_original
      expect {
        make_request
        expect(response.status).to eq(200), response.body
      }.to change { Guide.count }.by(-1)
      expect { guide.reload }
        .to raise_error(ActiveRecord::RecordNotFound)
      expect(json).to eq('meta' => {})
    end
  end
end
